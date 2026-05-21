import type { DemoStep, FlowActionType } from '../types';

interface Props {
  step: DemoStep | null;
  stepNumber: number;
  totalSteps: number;
  phase: 'idle' | 'running' | 'complete';
}

const actionMeta: Record<
  FlowActionType,
  { verb: string; icon: string; color: string }
> = {
  click: { verb: 'Click', icon: '👆', color: 'border-amber-500/60 bg-amber-500/10 text-amber-200' },
  type: { verb: 'Type', icon: '⌨️', color: 'border-blue-500/60 bg-blue-500/10 text-blue-200' },
  navigate: { verb: 'Navigate', icon: '→', color: 'border-violet-500/60 bg-violet-500/10 text-violet-200' },
  observe: { verb: 'Inspect', icon: '🔍', color: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200' },
};

function targetLabel(target?: string) {
  if (!target) return '';
  return target
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function StepActionOverlay({ step, stepNumber, totalSteps, phase }: Props) {
  if (phase !== 'running' || !step) return null;

  const meta = step.action ? actionMeta[step.action] : null;
  const isIssue = step.log.toLowerCase().includes('issue:');
  const target = step.actionTarget ? targetLabel(step.actionTarget) : null;

  return (
    <>
      {/* Top progress strip */}
      <div className="absolute top-0 left-0 right-0 z-50 h-1.5 bg-zinc-800 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
        />
      </div>

      {/* Large bottom action card */}
      <div className="absolute inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none">
        <div
          className={`mx-auto max-w-2xl rounded-2xl border-2 shadow-2xl backdrop-blur-md px-5 py-4 animate-[slideUp_0.25s_ease-out] ${
            isIssue
              ? 'border-red-500/70 bg-red-950/90 shadow-red-900/30'
              : 'border-violet-500/70 bg-zinc-950/95 shadow-violet-900/40'
          }`}
        >
          <div className="flex items-start gap-4">
            {meta && (
              <div
                className={`shrink-0 w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl ${meta.color}`}
              >
                {meta.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-1 rounded-full bg-violet-600/30 border border-violet-500/50 text-violet-200 text-xs font-bold font-mono">
                  STEP {stepNumber} / {totalSteps}
                </span>
                {step.flowName && (
                  <span className="text-zinc-400 text-xs font-medium">{step.flowName}</span>
                )}
                {step.flowStep && (
                  <span className="text-zinc-500 text-xs">· Flow {step.flowStep}</span>
                )}
              </div>
              <p className={`text-xl sm:text-2xl font-bold leading-tight ${isIssue ? 'text-red-100' : 'text-white'}`}>
                {meta ? `${meta.verb}${target ? `: ${target}` : ''}` : step.label}
              </p>
              {step.typedText && (
                <p className="mt-1 text-base font-mono text-blue-300">
                  &quot;{step.typedText}&quot;
                </p>
              )}
              <p className={`mt-2 text-sm sm:text-base leading-snug ${isIssue ? 'text-red-200/90' : 'text-zinc-300'}`}>
                {step.log}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side pulse when interacting */}
      {step.action && step.action !== 'observe' && (
        <div className="absolute inset-2 z-20 rounded-xl border-2 border-violet-400/40 pointer-events-none animate-pulse" />
      )}
    </>
  );
}
