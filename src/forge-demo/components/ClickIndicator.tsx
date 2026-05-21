import { useEffect, useState } from 'react';

interface Props {
  target: string | null;
  action: 'click' | 'type' | 'navigate' | 'observe' | null;
  containerRef: React.RefObject<HTMLElement | null>;
}

export function ClickIndicator({ target, action, containerRef }: Props) {
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!target || !containerRef.current || action === 'observe') {
      setPoint(null);
      return;
    }

    const update = () => {
      const root = containerRef.current;
      const el = root?.querySelector(`[data-forge-target="${target}"]`);
      if (!el || !root) {
        setPoint(null);
        return;
      }
      const rootRect = root.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setPoint({
        x: rect.left - rootRect.left + rect.width / 2,
        y: rect.top - rootRect.top + rect.height / 2,
      });
    };

    setPulse(true);
    const pulseTimer = setTimeout(() => setPulse(false), 450);
    update();
    const raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(pulseTimer);
    };
  }, [target, action, containerRef]);

  if (!point || !action || action === 'observe') return null;

  return (
    <>
      <div
        className="absolute z-40 pointer-events-none transition-all duration-300 ease-out"
        style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          className="drop-shadow-lg -rotate-12"
          fill="white"
          stroke="black"
          strokeWidth="1"
        >
          <path d="M5 3l3.5 14L12 10l7 1L5 3z" />
        </svg>
      </div>
      {pulse && (
        <span
          className="absolute z-30 rounded-full border-2 border-violet-400 bg-violet-400/20 pointer-events-none animate-ping"
          style={{
            left: point.x,
            top: point.y,
            width: 48,
            height: 48,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      {action === 'type' && (
        <span
          className="absolute z-30 rounded-md px-2 py-0.5 text-[10px] font-mono bg-violet-600 text-white pointer-events-none"
          style={{
            left: point.x,
            top: point.y - 28,
            transform: 'translateX(-50%)',
          }}
        >
          typing…
        </span>
      )}
    </>
  );
}
