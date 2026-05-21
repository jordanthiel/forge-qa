import { useState } from 'react';
import { forgeIssues } from '../data/issues';
import type { ForgeIssue } from '../types';
import { buildClaudePrompt, buildJiraPayload, copyToClipboard } from '../utils/issueIntegrations';
import { IssueScreenshot } from './IssueScreenshot';

interface Props {
  open: boolean;
  onClose: () => void;
}

const severityStyles = {
  high: 'bg-red-500/20 text-red-300 border-red-500/40',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  low: 'bg-zinc-700/50 text-zinc-400 border-zinc-600',
};

function IssueCard({
  issue,
  onToast,
}: {
  issue: ForgeIssue;
  onToast: (msg: string) => void;
}) {
  const [busy, setBusy] = useState<'claude' | 'jira' | null>(null);

  const sendClaude = async () => {
    setBusy('claude');
    const ok = await copyToClipboard(buildClaudePrompt(issue));
    onToast(ok ? 'Copied fix prompt — paste into Claude Code' : 'Copy failed');
    setBusy(null);
  };

  const sendJira = async () => {
    setBusy('jira');
    const ok = await copyToClipboard(buildJiraPayload(issue));
    onToast(ok ? 'Copied Jira issue — paste into Create Issue' : 'Copy failed');
    setBusy(null);
  };

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      <div className="grid md:grid-cols-[220px_1fr] gap-0">
        <IssueScreenshot issue={issue} className="min-h-[160px] md:min-h-full md:rounded-none md:border-0 md:border-r border-b md:border-b-0 border-zinc-800" />
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap items-start gap-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded border uppercase font-semibold ${severityStyles[issue.severity]}`}
            >
              {issue.severity}
            </span>
            <span className="text-[10px] text-zinc-500">{issue.browserDevice}</span>
          </div>
          <h4 className="text-sm font-semibold text-zinc-100">{issue.title}</h4>
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{issue.why}</p>
          <ol className="text-[10px] text-zinc-500 list-decimal list-inside space-y-0.5">
            {issue.repro.slice(0, 2).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
            {issue.repro.length > 2 && <li>…{issue.repro.length - 2} more steps</li>}
          </ol>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={sendClaude}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-orange-600/90 to-amber-600/90 text-white text-xs font-semibold hover:from-orange-500 hover:to-amber-500 disabled:opacity-50"
            >
              <span className="text-sm">✳</span>
              {busy === 'claude' ? 'Copying…' : 'Send to Claude'}
            </button>
            <button
              type="button"
              onClick={sendJira}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0052CC] text-white text-xs font-semibold hover:bg-[#0065FF] disabled:opacity-50"
            >
              <span className="text-sm font-bold">J</span>
              {busy === 'jira' ? 'Copying…' : 'Create Jira bug'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ForgeResultsModal({ open, onClose }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  if (!open) return null;

  const high = forgeIssues.filter((i) => i.severity === 'high').length;
  const medium = forgeIssues.filter((i) => i.severity === 'medium').length;
  const low = forgeIssues.filter((i) => i.severity === 'low').length;

  const copyAllClaude = async () => {
    const text = forgeIssues
      .map((issue, i) => `--- Issue ${i + 1} ---\n${buildClaudePrompt(issue)}`)
      .join('\n\n');
    const ok = await copyToClipboard(text);
    setToast(ok ? 'Copied all issues for Claude' : 'Copy failed');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close results"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="forge-results-title"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl shadow-violet-900/20 overflow-hidden"
      >
        <header className="shrink-0 px-5 py-4 border-b border-zinc-800 bg-gradient-to-r from-zinc-950 via-violet-950/30 to-zinc-950">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] text-violet-400 font-medium uppercase tracking-wider mb-1">
                Forge · Review complete
              </p>
              <h2 id="forge-results-title" className="text-lg font-bold text-zinc-50">
                Product QA Report
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                {forgeIssues.length} issues with screenshots · {high} high · {medium} medium ·{' '}
                {low} low
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
              ✕
            </button>
          </div>
          {toast && (
            <p className="mt-3 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
              {toast}
            </p>
          )}
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-5 space-y-4">
          <p className="text-xs text-zinc-500">
            Each finding includes a capture from the preview run. Push fixes to your agent or
            tracker.
          </p>
          {forgeIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onToast={setToast} />
          ))}
        </div>

        <footer className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-zinc-800 bg-zinc-900/50">
          <button
            type="button"
            onClick={copyAllClaude}
            className="text-xs px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Copy all prompts for Claude
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-xs px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-500"
          >
            Close & continue demo
          </button>
        </footer>
      </div>
    </div>
  );
}
