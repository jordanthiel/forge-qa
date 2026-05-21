import { forgeIssues } from '../data/issues';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
  selectedIssueId: string | null;
}

export function CursorFixPanel({ phase, selectedIssueId }: Props) {
  const issue = forgeIssues.find((i) => i.id === selectedIssueId) ?? forgeIssues[0];

  const prompt = phase === 'complete' ? `Fix Forge QA issue in preview deployment:

**${issue.title}** (${issue.severity} · ${issue.browserDevice})

Context: ${issue.why}

Repro:
${issue.repro.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Apply this fix: ${issue.fix}

Files likely involved: OnboardingModal.tsx, WorkspaceSetup.tsx, App.native.tsx` : '';

  if (phase !== 'complete') {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
        <h3 className="text-xs font-semibold text-zinc-100 mb-2 flex items-center gap-2">
          <span className="text-zinc-400">⌘</span> Cursor fix prompt
        </h3>
        <p className="text-[10px] text-zinc-600">
          Agent-ready fix prompts appear when the report is ready.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-900/80">
        <h3 className="text-xs font-semibold text-zinc-100 flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-zinc-800 flex items-center justify-center text-[10px]">
            ⌘
          </span>
          Send to Cursor
        </h3>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(prompt)}
          className="text-[10px] px-2 py-1 rounded-md border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
        >
          Copy prompt
        </button>
      </div>
      <pre className="p-3 text-[10px] text-zinc-400 font-mono leading-relaxed overflow-auto max-h-40 whitespace-pre-wrap">
        {prompt}
      </pre>
    </div>
  );
}
