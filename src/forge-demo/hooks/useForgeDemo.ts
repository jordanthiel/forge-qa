import { useCallback, useEffect, useRef, useState } from 'react';
import { demoSteps } from '../data/demoSteps';
import { testMatrixItems } from '../data/testMatrix';
import type {
  AppScreen,
  DemoPhase,
  DemoSpeed,
  FlowActionType,
  MatrixStatus,
  PreviewContext,
} from '../types';

const initialMatrix = (): Record<string, MatrixStatus> =>
  Object.fromEntries(testMatrixItems.map((item) => [item.id, 'pending']));

const defaultPreview: PreviewContext = {
  mode: 'web',
  browser: 'Chrome',
  viewport: 'Desktop · 1440px',
};

function speedMultiplier(speed: DemoSpeed): number {
  if (speed === 'fast') return 0.35;
  if (speed === 'instant') return 0;
  return 1;
}

export function useForgeDemo() {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [speed, setSpeed] = useState<DemoSpeed>('normal');
  const [stepIndex, setStepIndex] = useState(-1);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [matrix, setMatrix] = useState<Record<string, MatrixStatus>>(initialMatrix);
  const [preview, setPreview] = useState<PreviewContext>(defaultPreview);
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [highlightIssueId, setHighlightIssueId] = useState<string | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [actionTarget, setActionTarget] = useState<string | null>(null);
  const [action, setAction] = useState<FlowActionType | null>(null);
  const [typedText, setTypedText] = useState('');
  const [flowName, setFlowName] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<string | null>(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runIdRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = useCallback(() => {
    clearTimer();
    runIdRef.current += 1;
    setPhase('idle');
    setStepIndex(-1);
    setCurrentStepId(null);
    setLogs([]);
    setMatrix(initialMatrix());
    setPreview(defaultPreview);
    setScreen('welcome');
    setHighlightIssueId(null);
    setSelectedIssueId(null);
    setActionTarget(null);
    setAction(null);
    setTypedText('');
    setFlowName(null);
    setFlowStep(null);
    setShowResultsModal(false);
  }, []);

  const applyFinalState = useCallback(() => {
    const finalMatrix = Object.fromEntries(
      testMatrixItems.map((item) => [item.id, item.finalStatus]),
    ) as Record<string, MatrixStatus>;
    setMatrix(finalMatrix);
    setPhase('complete');
    setStepIndex(demoSteps.length - 1);
    setCurrentStepId('posting');
    setLogs(demoSteps.map((s) => s.log));
    setPreview({ mode: 'web', browser: 'Chrome', viewport: 'Mobile · iPhone 14' });
    setScreen('welcome');
    setHighlightIssueId('issue-1');
    setSelectedIssueId('issue-1');
    setShowResultsModal(true);
  }, []);

  const applyStep = useCallback((index: number) => {
    const step = demoSteps[index];
    if (!step) return;
    setStepIndex(index);
    setCurrentStepId(step.id);
    setLogs((prev) => [...prev, step.log]);
    if (step.preview) setPreview(step.preview);
    if (step.screen) setScreen(step.screen);
    setFlowName(step.flowName ?? null);
    setFlowStep(step.flowStep ?? null);
    setAction(step.action ?? null);
    setActionTarget(step.actionTarget ?? null);
    setTypedText(step.typedText ?? '');
    if (step.matrixIds?.length) {
      setMatrix((prev) => {
        const next = { ...prev };
        for (const id of step.matrixIds!) {
          if (step.matrixStatus) next[id] = step.matrixStatus;
        }
        return next;
      });
      const matrixItem = testMatrixItems.find((m) => step.matrixIds?.includes(m.id));
      if (matrixItem?.issueId && step.matrixStatus && step.matrixStatus !== 'running') {
        setHighlightIssueId(matrixItem.issueId);
      }
    }
  }, []);

  const runFromStep = useCallback(
    (startIndex: number, currentSpeed: DemoSpeed) => {
      const runId = ++runIdRef.current;
      clearTimer();

      if (currentSpeed === 'instant') {
        applyFinalState();
        return;
      }

      const runStep = (index: number) => {
        if (runId !== runIdRef.current) return;
        if (index >= demoSteps.length) {
          applyFinalState();
          return;
        }
        applyStep(index);
        const mult = speedMultiplier(currentSpeed);
        const duration = Math.max(80, demoSteps[index].durationMs * mult);
        timerRef.current = setTimeout(() => runStep(index + 1), duration);
      };

      setPhase('running');
      setLogs([]);
      setMatrix(initialMatrix());
      runStep(startIndex);
    },
    [applyFinalState, applyStep],
  );

  const startReview = useCallback(() => {
    reset();
    runIdRef.current += 1;
    setTimeout(() => runFromStep(0, speed), 0);
  }, [reset, runFromStep, speed]);

  const skipToReport = useCallback(() => {
    clearTimer();
    runIdRef.current += 1;
    applyFinalState();
  }, [applyFinalState]);

  useEffect(() => () => clearTimer(), []);

  const currentStep =
    stepIndex >= 0 && stepIndex < demoSteps.length ? demoSteps[stepIndex] : null;
  const progress =
    phase === 'complete'
      ? 100
      : stepIndex < 0
        ? 0
        : Math.round(((stepIndex + 1) / demoSteps.length) * 100);

  return {
    phase,
    speed,
    setSpeed,
    stepIndex,
    currentStepId,
    currentStep,
    progress,
    logs,
    matrix,
    preview,
    screen,
    highlightIssueId,
    selectedIssueId,
    setSelectedIssueId,
    actionTarget,
    action,
    typedText,
    flowName,
    flowStep,
    showResultsModal,
    dismissResultsModal: () => setShowResultsModal(false),
    openResultsModal: () => setShowResultsModal(true),
    totalSteps: demoSteps.length,
    reset,
    startReview,
    skipToReport,
  };
}
