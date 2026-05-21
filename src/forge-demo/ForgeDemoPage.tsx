import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CursorFixPanel } from './components/CursorFixPanel';
import { ForgeReport } from './components/ForgeReport';
import { ForgeTimeline } from './components/ForgeTimeline';
import { GitHubPRPanel } from './components/GitHubPRPanel';
import { PreviewFrame } from './components/PreviewFrame';
import { RecordModeControls } from './components/RecordModeControls';
import { TestMatrixPanel } from './components/TestMatrixPanel';
import { ForgeResultsModal } from './components/ForgeResultsModal';
import { RecordIntroSlide } from './components/RecordIntroSlide';
import { TestsComparisonCard } from './components/TestsComparisonCard';
import { useForgeDemo } from './hooks/useForgeDemo';

export default function ForgeDemoPage() {
  const demo = useForgeDemo();
  const [recordMode, setRecordMode] = useState(() =>
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('record') === '1'
      : false,
  );
  const [controlsVisible, setControlsVisible] = useState(true);
  const [recordIntroActive, setRecordIntroActive] = useState(
    () =>
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('record') === '1',
  );
  const hideControlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enterRecordMode = useCallback(async () => {
    setRecordMode(true);
    setRecordIntroActive(true);
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      /* fullscreen optional if browser blocks it */
    }
  }, []);

  const exitRecordMode = useCallback(async () => {
    setRecordMode(false);
    setRecordIntroActive(false);
    setControlsVisible(true);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (recordMode) exitRecordMode();
      }
      if (e.key === 'r' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (recordMode) exitRecordMode();
        else enterRecordMode();
      }
    };
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && recordMode) {
        setRecordMode(false);
        setControlsVisible(true);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [recordMode, enterRecordMode, exitRecordMode]);

  useEffect(() => {
    if (!recordMode || recordIntroActive) return;
    const show = () => {
      setControlsVisible(true);
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
    const scheduleHide = () => {
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
      hideControlsTimerRef.current = setTimeout(() => setControlsVisible(false), 2500);
    };
    const onMove = () => {
      show();
      scheduleHide();
    };
    setControlsVisible(true);
    scheduleHide();
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, [recordMode, recordIntroActive]);

  const finishRecordIntro = useCallback(() => {
    setRecordIntroActive(false);
    demo.startReview();
  }, [demo.startReview]);

  const panelProps = {
    phase: demo.phase,
    speed: demo.speed,
    onSpeedChange: demo.setSpeed,
    onRun: demo.startReview,
    onReset: demo.reset,
    onSkip: demo.skipToReport,
    onViewResults: demo.openResultsModal,
  };

  const previewProps = {
    preview: demo.preview,
    screen: demo.screen,
    highlightIssueId: demo.highlightIssueId,
    expanded: true,
    actionTarget: demo.actionTarget,
    action: demo.action,
    typedText: demo.typedText,
    flowName: demo.flowName,
    flowStep: demo.flowStep,
    phase: demo.phase,
    currentStep: demo.currentStep,
    stepNumber: demo.stepIndex + 1,
    totalSteps: demo.totalSteps,
  };

  if (recordMode) {
    return (
      <div className="fixed inset-0 z-40 bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
        <RecordIntroSlide active={recordIntroActive} onComplete={finishRecordIntro} />

        <main
          className={`flex-1 min-h-0 w-full grid grid-rows-[minmax(0,1fr)_minmax(140px,24vh)] gap-2 p-2 transition-opacity duration-500 ${
            recordIntroActive ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <section className="min-h-0 rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            <PreviewFrame {...previewProps} />
          </section>

          <div className="min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3">
            <div className="lg:col-span-5 min-h-0">
              <TestMatrixPanel matrix={demo.matrix} />
            </div>
            <div className="lg:col-span-7 min-h-0 flex flex-col gap-2 overflow-hidden">
              <ForgeTimeline
                phase={demo.phase}
                logs={demo.logs}
                currentStepId={demo.currentStepId}
                progress={demo.progress}
              />
              <div className="flex-1 min-h-0 overflow-hidden">
                <ForgeReport
                  phase={demo.phase}
                  selectedIssueId={demo.selectedIssueId}
                  onSelectIssue={demo.setSelectedIssueId}
                />
              </div>
            </div>
          </div>
        </main>

        {!recordIntroActive && (
          <RecordModeControls
            {...panelProps}
            onExit={exitRecordMode}
            visible={controlsVisible}
          />
        )}

        <ForgeResultsModal open={demo.showResultsModal} onClose={demo.dismissResultsModal} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="shrink-0 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-violet-900/40">
            F
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight">Forge</h1>
            <p className="text-[10px] text-zinc-500">Autonomous Product QA · Demo</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={enterRecordMode}
            className="text-[11px] font-medium text-white bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg shadow-lg shadow-violet-900/30"
          >
            Record mode
          </button>
          <Link
            to="/"
            className="text-[11px] text-zinc-500 hover:text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded-lg"
          >
            ← Landing
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full min-h-0 overflow-hidden p-3 sm:p-4">
        <div className="h-[calc(100vh-4.25rem)] w-full grid grid-cols-12 gap-3">
          <aside className="col-span-12 xl:col-span-2 flex flex-col gap-3 min-h-0 overflow-auto xl:overflow-hidden">
            <GitHubPRPanel {...panelProps} />
            <div className="hidden lg:block shrink-0">
              <TestsComparisonCard />
            </div>
          </aside>

          <section className="col-span-12 xl:col-span-7 flex flex-col gap-2 min-h-0">
            <div className="flex-[3] min-h-[360px] xl:min-h-0 rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <PreviewFrame {...previewProps} />
            </div>
            <div className="flex-1 min-h-[140px] xl:min-h-0">
              <TestMatrixPanel matrix={demo.matrix} />
            </div>
          </section>

          <aside className="col-span-12 xl:col-span-3 flex flex-col gap-3 min-h-0 overflow-auto">
            <ForgeTimeline
              phase={demo.phase}
              logs={demo.logs}
              currentStepId={demo.currentStepId}
              progress={demo.progress}
            />
            <ForgeReport
              phase={demo.phase}
              selectedIssueId={demo.selectedIssueId}
              onSelectIssue={demo.setSelectedIssueId}
            />
            <CursorFixPanel phase={demo.phase} selectedIssueId={demo.selectedIssueId} />
          </aside>
        </div>
      </main>

      <ForgeResultsModal open={demo.showResultsModal} onClose={demo.dismissResultsModal} />

      {demo.phase === 'complete' && !demo.showResultsModal && (
        <button
          type="button"
          onClick={demo.openResultsModal}
          className="fixed bottom-6 right-6 z-30 px-4 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-900/40 hover:bg-violet-500"
        >
          View QA results
        </button>
      )}
    </div>
  );
}
