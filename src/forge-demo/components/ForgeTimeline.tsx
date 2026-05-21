import { demoSteps } from '../data/demoSteps';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
  logs: string[];
  currentStepId: string | null;
  progress: number;
}

export function ForgeTimeline({ phase, logs, currentStepId, progress }: Props) {
  const current = demoSteps.find((s) => s.id === currentStepId);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 flex flex-col shrink-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          <h3 className="text-xs font-semibold text-zinc-100">Forge Analysis</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">{progress}%</span>
      </div>
      {current && phase === 'running' && (
        <div className="mb-3 p-2.5 rounded-lg border border-violet-500/40 bg-violet-500/10">
          <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wide">Now</p>
          <p className="text-sm font-semibold text-violet-100 mt-0.5">{current.label}</p>
          <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{current.log}</p>
        </div>
      )}
      <div className="h-1 rounded-full bg-zinc-800 mb-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="overflow-auto font-mono text-[10px] leading-relaxed space-y-1 max-h-24">
        {logs.length === 0 && (
          <p className="text-zinc-600">Waiting to start Forge review…</p>
        )}
        {logs.map((line, i) => (
          <p key={i} className="text-zinc-400">
            <span className="text-zinc-600 select-none">{String(i + 1).padStart(2, '0')} </span>
            {line}
          </p>
        ))}
        {phase === 'running' && (
          <p className="text-violet-400/80 animate-pulse">▌</p>
        )}
      </div>
    </div>
  );
}
