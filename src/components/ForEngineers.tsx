const ForEngineers = () => {
  return (
    <section id="engineers" className="bg-slate-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-8 text-center">
          For engineers: a devtool you'd actually use.
        </h2>

        <div className="space-y-6 mb-12">
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <span className="text-slate-300">CLI-first: integrate <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">forge run</code> into local dev and CI.</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <span className="text-slate-300">Works with mainstream stacks (React, Next.js, Rails, Laravel, etc.).</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <span className="text-slate-300">Specs are human-readable JSON/YAML with natural-language descriptions.</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <span className="text-slate-300">Prefers semantic selectors and <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">data-testid</code> attributes over brittle XPaths.</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <span className="text-slate-300">Vision-based checks only when needed (modals, spacing, blur, layout).</span>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Example: qa_specs.json</h3>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-300">
              <div>[</div>
              <div className="ml-4">{'{'}</div>
              <div className="ml-8">
                <span className="text-amber-400">"id"</span>: <span className="text-green-400">"modal_layout_test"</span>,
              </div>
              <div className="ml-8">
                <span className="text-amber-400">"description"</span>: <span className="text-green-400">"Open settings modal, ensure minimal margin and blurred background."</span>,
              </div>
              <div className="ml-8">
                <span className="text-amber-400">"start_url"</span>: <span className="text-green-400">"/"</span>,
              </div>
              <div className="ml-8">
                <span className="text-amber-400">"visual_expectations"</span>: [
              </div>
              <div className="ml-12">
                <span className="text-green-400">"modal_margin_minimal"</span>, <span className="text-green-400">"background_blur"</span>
              </div>
              <div className="ml-8">]</div>
              <div className="ml-4">{'}'}</div>
              <div>]</div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForEngineers;

