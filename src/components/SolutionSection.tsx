const SolutionSection = () => {
  return (
    <section id="solution" className="bg-slate-950 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
            Forge runs your app, tests it like a user, and talks back to your AI dev.
          </h2>
          <p className="text-xl text-amber-400 font-medium">
            Build (AI) → Test (Forge) → Fix (AI) → Deploy.
          </p>
        </div>

        {/* Three Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-50 mb-3">
              Run the app in a real browser
            </h3>
            <p className="text-slate-300 mb-3">
              Forge spins up your app in an isolated environment (e.g., via a dev command or Docker).
            </p>
            <p className="text-slate-300 text-sm">
              Uses a vision model that interacts with your app like a real user would.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-50 mb-3">
              Execute critical flows + visual checks
            </h3>
            <p className="text-slate-300 mb-3">
              Forge learns your critical flows from simple natural language specs or diffs.
            </p>
            <p className="text-slate-300 text-sm">
              It clicks, types, navigates, inspects DOM/logs, and runs visual checks with a vision LLM.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-50 mb-3">
              Return fix-ready reports for AI agents
            </h3>
            <p className="text-slate-300 mb-3">
              Each failure is a structured JSON report: steps, errors, screenshots, visual verdicts.
            </p>
            <p className="text-slate-300 text-sm">
              AI coding agents consume these to apply precise fixes without extra human context.
            </p>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-6 py-4 text-center min-w-[140px]">
              <div className="text-amber-400 font-semibold mb-1">Dev/AI Agent</div>
              <div className="text-slate-400 text-xs">Writes code</div>
            </div>
            <div className="text-slate-600">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="bg-amber-400/20 border border-amber-400/50 rounded-lg px-6 py-4 text-center min-w-[140px]">
              <div className="text-amber-400 font-semibold mb-1">Forge</div>
              <div className="text-slate-400 text-xs">Tests & validates</div>
            </div>
            <div className="text-slate-600">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-6 py-4 text-center min-w-[140px]">
              <div className="text-amber-400 font-semibold mb-1">QA Report</div>
              <div className="text-slate-400 text-xs">Structured feedback</div>
            </div>
            <div className="text-slate-600">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-6 py-4 text-center min-w-[140px]">
              <div className="text-amber-400 font-semibold mb-1">Dev/AI Agent</div>
              <div className="text-slate-400 text-xs">Applies fixes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

