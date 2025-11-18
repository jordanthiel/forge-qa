const Roadmap = () => {
  return (
    <section id="roadmap" className="bg-slate-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-12 text-center">
          Roadmap (draft)
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* MVP */}
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-6">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center font-bold mb-4">
              MVP
            </div>
            <h3 className="text-lg font-semibold text-slate-50 mb-3">MVP</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• CLI + vision model runner</li>
              <li>• Spec-based flows</li>
              <li>• DOM + log assertions</li>
            </ul>
          </div>

          {/* Visual QA */}
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-6">
            <div className="w-10 h-10 bg-amber-400/50 text-slate-50 rounded-full flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-slate-50 mb-3">Visual QA</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Vision LLM integration</li>
              <li>• Layout/margin/blur verification</li>
            </ul>
          </div>

          {/* Deep integrations */}
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-6">
            <div className="w-10 h-10 bg-amber-400/30 text-slate-50 rounded-full flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-slate-50 mb-3">Deep integrations</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• GitHub/GitLab, CI providers</li>
              <li>• Recipes for Cursor, Claude Code</li>
            </ul>
          </div>

          {/* Autonomous agent loop */}
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-6">
            <div className="w-10 h-10 bg-amber-400/20 text-slate-50 rounded-full flex items-center justify-center font-bold mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold text-slate-50 mb-3">Autonomous agent loop</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Tight LLM-tool integrations</li>
              <li>• Agents automatically call Forge, read QA reports, and apply fixes</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

