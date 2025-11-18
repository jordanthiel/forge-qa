const ProblemSection = () => {
  return (
    <section id="problem" className="bg-slate-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">
              AI can write code fast. Testing it is still painfully manual.
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Developers using AI tools (Cursor, Claude Code, Copilot, etc.) can generate code quickly. But they must still manually click through features, eyeball the UI, and verify behavior. This human QA layer is now the main bottleneck.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-slate-300">You ask AI to build a feature – it ships code in seconds.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-slate-300">You spend 30–60 minutes clicking through flows to see what actually works.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-slate-300">Visual issues (modals, spacing, background blur) slip through because they're hard to encode as tests.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-slate-300">AI agents lack real environment awareness and actionable product feedback.</span>
              </li>
            </ul>
            <p className="text-lg font-semibold text-slate-50 pt-4">
              Forge exists to remove that human-in-the-loop testing bottleneck.
            </p>
          </div>

          {/* Right Column - Funnel Diagram */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm space-y-4">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-amber-400 text-sm font-medium mb-2">AI code generation</div>
                <div className="text-slate-300 text-xs">Code ships in seconds</div>
              </div>
              <div className="flex justify-center">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-6 text-center">
                <div className="text-red-400 text-sm font-medium mb-2">Manual testing bottleneck</div>
                <div className="text-slate-300 text-xs">30-60 minutes of manual QA</div>
              </div>
              <div className="flex justify-center">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-green-400 text-sm font-medium mb-2">Ship</div>
                <div className="text-slate-300 text-xs">Finally deploy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

