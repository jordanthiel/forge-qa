import { testMatrixItems } from '../data/testMatrix';
import type { MatrixStatus } from '../types';
import { StatusPill } from './StatusPill';

interface Props {
  matrix: Record<string, MatrixStatus>;
}

const platformOrder = ['Web', 'iOS', 'Android'] as const;

const platformIcon: Record<string, string> = {
  Web: '◉',
  iOS: ' ',
  Android: '▣',
};

export function TestMatrixPanel({ matrix }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-zinc-100 tracking-wide">Test Matrix</h3>
        <span className="text-[10px] text-zinc-500">Cross-platform QA</span>
      </div>
      <div className="space-y-4 flex-1 overflow-auto min-h-0">
        {platformOrder.map((platform) => {
          const items = testMatrixItems.filter((i) => i.platform === platform);
          return (
            <div key={platform}>
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="text-violet-400">{platformIcon[platform]}</span>
                {platform}
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {items.map((item) => {
                  const status = matrix[item.id] ?? 'pending';
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg border transition-all duration-300 ${
                        status === 'running'
                          ? 'border-blue-500/40 bg-blue-500/5'
                          : status === 'failed'
                            ? 'border-red-500/30 bg-red-500/5'
                            : status === 'warning'
                              ? 'border-amber-500/30 bg-amber-500/5'
                              : status === 'passed'
                                ? 'border-emerald-500/20 bg-emerald-500/5'
                                : 'border-zinc-800/80 bg-zinc-950/50'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-[11px] text-zinc-200 truncate">
                          {item.label}
                          <span className="text-zinc-500"> / </span>
                          {item.sublabel}
                        </p>
                      </div>
                      <StatusPill status={status} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
