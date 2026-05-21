import { forgeIssues } from '../data/issues';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
  selectedIssueId: string | null;
  onSelectIssue: (id: string) => void;
}

const severityStyles = {
  high: 'bg-red-500/15 text-red-300 border-red-500/40',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  low: 'bg-zinc-700/50 text-zinc-400 border-zinc-600',
};

export function ForgeReport({ phase, selectedIssueId, onSelectIssue }: Props) {
  if (phase !== 'complete') {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 flex items-center justify-center min-h-[180px]">
        <p className="text-[11px] text-zinc-600 text-center max-w-xs">
          Forge PR report will appear here after the review completes.
        </p>
      </div>
    );
  }

  const selected = forgeIssues.find((i) => i.id === selectedIssueId) ?? forgeIssues[0];
  const high = forgeIssues.filter((i) => i.severity === 'high').length;
  const medium = forgeIssues.filter((i) => i.severity === 'medium').length;
  const low = forgeIssues.filter((i) => i.severity === 'low').length;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden flex flex-col h-full min-h-[140px] max-h-full">
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] text-zinc-500">forge-bot</span>
          <span className="text-[10px] text-zinc-600">commented on PR</span>
        </div>
        <h3 className="text-sm font-semibold text-zinc-100">Forge Product QA Report</h3>
        <p className="text-[10px] text-zinc-500 mt-1">
          {forgeIssues.length} issues · {high} high · {medium} medium · {low} low · Preview reviewed
          across web, iOS, and Android
        </p>
      </div>
      <div className="flex flex-1 min-h-0">
        <ul className="w-2/5 border-r border-zinc-800 overflow-auto">
          {forgeIssues.map((issue) => (
            <li key={issue.id}>
              <button
                type="button"
                onClick={() => onSelectIssue(issue.id)}
                className={`w-full text-left px-3 py-2 border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors ${
                  selectedIssueId === issue.id ? 'bg-violet-500/10' : ''
                }`}
              >
                <span
                  className={`inline-block text-[9px] px-1.5 py-0.5 rounded border uppercase mb-1 ${severityStyles[issue.severity]}`}
                >
                  {issue.severity}
                </span>
                <p className="text-[10px] text-zinc-300 line-clamp-2">{issue.title}</p>
                <p className="text-[9px] text-zinc-600 mt-0.5">{issue.browserDevice}</p>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex-1 p-3 overflow-auto text-[10px] space-y-3">
          <div>
            <p className="text-zinc-500 uppercase tracking-wider text-[9px] mb-1">Issue</p>
            <p className="text-zinc-100 font-medium text-xs">{selected.title}</p>
          </div>
          <div>
            <p className="text-zinc-500 uppercase tracking-wider text-[9px] mb-1">Why it matters</p>
            <p className="text-zinc-400 leading-relaxed">{selected.why}</p>
          </div>
          <div>
            <p className="text-zinc-500 uppercase tracking-wider text-[9px] mb-1">Repro steps</p>
            <ol className="list-decimal list-inside text-zinc-400 space-y-0.5">
              {selected.repro.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
            <p className="text-emerald-400/90 uppercase tracking-wider text-[9px] mb-1">
              Suggested fix
            </p>
            <p className="text-zinc-300">{selected.fix}</p>
          </div>
          <div className="rounded-md border border-zinc-800 bg-zinc-950 h-16 flex items-center justify-center text-zinc-600 text-[9px]">
            Screenshot · {selected.browserDevice}
          </div>
        </div>
      </div>
    </div>
  );
}
