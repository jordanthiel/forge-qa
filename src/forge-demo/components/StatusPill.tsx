import type { MatrixStatus } from '../types';

const styles: Record<MatrixStatus, string> = {
  pending: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  running: 'bg-blue-500/15 text-blue-300 border-blue-500/40 animate-pulse',
  passed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  failed: 'bg-red-500/15 text-red-300 border-red-500/40',
};

const labels: Record<MatrixStatus, string> = {
  pending: 'Pending',
  running: 'Running',
  passed: 'Passed',
  warning: 'Warning',
  failed: 'Failed',
};

export function StatusPill({ status }: { status: MatrixStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wide ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
