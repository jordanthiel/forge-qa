import type { DemoPhase, DemoSpeed } from '../types';

interface Props {
  phase: DemoPhase;
  speed: DemoSpeed;
  onSpeedChange: (s: DemoSpeed) => void;
  onRun: () => void;
  onReset: () => void;
  onSkip: () => void;
  onViewResults?: () => void;
}

const files = [
  'OnboardingModal.tsx',
  'WorkspaceSetup.tsx',
  'DashboardEmptyState.tsx',
  'UpgradeModal.tsx',
  'mobile.css',
  'App.native.tsx',
];

export function GitHubPRPanel({
  phase,
  speed,
  onSpeedChange,
  onRun,
  onReset,
  onSkip,
  onViewResults,
}: Props) {
  const running = phase === 'running';
  const complete = phase === 'complete';

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Pull Request
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3 shadow-[0_0_40px_-12px_rgba(99,102,241,0.15)]">
        <h2 className="text-sm font-semibold text-zinc-100 leading-snug">
          feat: redesign onboarding flow
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-violet-400 font-medium">Claude Code</span>
          <span className="text-zinc-600">·</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Unit tests passing
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Redesigns onboarding to improve activation and reduce setup friction.
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="block text-[10px] font-mono text-blue-400 hover:text-blue-300 truncate"
        >
          https://preview-acme-cloud.vercel.app
        </a>
        <ul className="space-y-1 pt-1 border-t border-zinc-800">
          {files.map((f) => (
            <li key={f} className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
              <span className="text-emerald-500/80">M</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Demo speed</p>
        <div className="flex flex-col gap-1">
          {(
            [
              ['normal', 'Normal demo'],
              ['fast', 'Fast demo'],
              ['instant', 'Instant final state'],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-[11px] transition-colors ${
                speed === value
                  ? 'border-violet-500/50 bg-violet-500/10 text-violet-200'
                  : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <input
                type="radio"
                name="demo-speed"
                className="accent-violet-500"
                checked={speed === value}
                onChange={() => onSpeedChange(value)}
                disabled={running}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        {complete && onViewResults && (
          <button
            type="button"
            onClick={onViewResults}
            className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 shadow-lg shadow-emerald-900/30"
          >
            View QA results modal
          </button>
        )}
        <button
          type="button"
          onClick={onRun}
          disabled={running}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-900/30"
        >
          {running ? 'Forge review running…' : 'Run Forge Review'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2 rounded-lg border border-zinc-700 text-zinc-300 text-xs hover:bg-zinc-800/80"
        >
          Reset Demo
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="w-full py-2 rounded-lg border border-zinc-800 text-zinc-500 text-xs hover:text-zinc-300 hover:border-zinc-600"
        >
          Skip to Final Report
        </button>
      </div>
    </div>
  );
}
