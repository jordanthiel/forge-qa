import { useEffect, useState } from 'react';

const INTRO_DURATION_MS = 5200;

interface Props {
  active: boolean;
  onComplete: () => void;
}

export function RecordIntroSlide({ active, onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      setExiting(false);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / INTRO_DURATION_MS) * 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(onComplete, 450);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, onComplete]);

  const skip = () => {
    setExiting(true);
    setTimeout(onComplete, 300);
  };

  if (!active && !exiting) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950 transition-opacity duration-500 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-8 text-center animate-[fadeSlide_0.6s_ease-out]">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl font-bold shadow-2xl shadow-violet-900/50 mb-8">
          F
        </div>

        <p className="text-sm font-medium tracking-[0.2em] uppercase text-violet-400 mb-3">
          Autonomous product QA
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Forge is reviewing this PR
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl mx-auto mb-8">
          An AI agent tests your preview deployment like a real user — across browsers,
          viewports, iOS, and Android — then files a developer-ready report.
        </p>

        <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 py-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm mb-10">
          <NotManual label="Not manual QA" />
          <span className="hidden sm:block w-px h-8 bg-zinc-700" />
          <NotManual label="Not a screen recording" />
          <span className="hidden sm:block w-px h-8 bg-zinc-700" />
          <NotManual label="Forge autonomous review" positive />
        </div>

        <p className="text-sm text-zinc-500 mb-6">Starting cross-platform review…</p>

        <div className="max-w-md mx-auto h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-6 right-6 text-[11px] text-zinc-600 hover:text-zinc-400 px-3 py-1.5 rounded-lg border border-zinc-800/80 opacity-40 hover:opacity-100 transition-opacity"
      >
        Skip intro
      </button>
    </div>
  );
}

function NotManual({ label, positive }: { label: string; positive?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-sm">
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
          positive
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
        }`}
      >
        {positive ? '✓' : '✕'}
      </span>
      <span className={positive ? 'text-emerald-300/90 font-medium' : 'text-zinc-500'}>
        {label}
      </span>
    </span>
  );
}

export const RECORD_INTRO_DURATION_MS = INTRO_DURATION_MS;
