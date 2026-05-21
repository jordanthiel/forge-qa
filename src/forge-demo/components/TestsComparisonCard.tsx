export function TestsComparisonCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-4">
      <h3 className="text-xs font-semibold text-zinc-100 mb-3">Unit tests vs Forge</h3>
      <div className="grid grid-cols-2 gap-3 text-[10px]">
        <div className="rounded-lg border border-zinc-800 p-3 space-y-2">
          <p className="font-medium text-zinc-400">Traditional tests</p>
          <ul className="space-y-1 text-zinc-500">
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> DOM nodes exist
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Form validation passes
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Routes render
            </li>
            <li className="flex items-center gap-1.5 text-zinc-600">
              <span className="text-zinc-600">—</span> Visual layout
            </li>
            <li className="flex items-center gap-1.5 text-zinc-600">
              <span className="text-zinc-600">—</span> Cross-browser UX
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-3 space-y-2">
          <p className="font-medium text-violet-300">Forge product QA</p>
          <ul className="space-y-1 text-zinc-400">
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Real user flows
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Screenshots + repro
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Web + iOS + Android
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Severity + fixes
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-violet-400">✓</span> Agent-ready reports
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-zinc-500 leading-relaxed">
        AI agents ship fast — Forge catches product-quality regressions before merge.
      </p>
    </div>
  );
}
