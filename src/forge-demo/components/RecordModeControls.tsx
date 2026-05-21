import type { DemoPhase, DemoSpeed } from '../types';

interface Props {
  phase: DemoPhase;
  speed: DemoSpeed;
  onSpeedChange: (s: DemoSpeed) => void;
  onRun: () => void;
  onReset: () => void;
  onSkip: () => void;
  onExit: () => void;
  visible: boolean;
}

export function RecordModeControls({
  phase,
  speed,
  onSpeedChange,
  onRun,
  onReset,
  onSkip,
  onExit,
  visible,
}: Props) {
  const running = phase === 'running';

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 px-3 py-2 rounded-xl border border-zinc-700/80 bg-zinc-950/95 backdrop-blur-md shadow-2xl shadow-black/50">
        <button
          type="button"
          onClick={onRun}
          disabled={running}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold disabled:opacity-50"
        >
          {running ? 'Running…' : 'Run Forge Review'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="px-3 py-2 rounded-lg border border-zinc-700 text-zinc-300 text-xs hover:bg-zinc-800"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="px-3 py-2 rounded-lg border border-zinc-800 text-zinc-500 text-xs hover:text-zinc-300"
        >
          Skip to report
        </button>
        <select
          value={speed}
          onChange={(e) => onSpeedChange(e.target.value as DemoSpeed)}
          disabled={running}
          className="px-2 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs"
        >
          <option value="normal">Normal</option>
          <option value="fast">Fast</option>
          <option value="instant">Instant</option>
        </select>
        <div className="w-px h-6 bg-zinc-700" />
        <button
          type="button"
          onClick={onExit}
          className="px-3 py-2 rounded-lg border border-zinc-600 text-zinc-400 text-xs hover:text-zinc-200"
        >
          Exit record mode
        </button>
        <span className="text-[10px] text-zinc-600 hidden sm:inline">Esc · move mouse to show</span>
      </div>
    </div>
  );
}
