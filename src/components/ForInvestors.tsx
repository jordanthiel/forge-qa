const ForInvestors = () => {
  return (
    <section id="investors" className="bg-slate-950 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-8 text-center">
          For investors: a wedge into AI-native engineering workflows.
        </h2>

        <p className="text-lg text-slate-300 leading-relaxed mb-8 text-center">
          Position Forge as core infrastructure for AI-native software development and automated QA operations.
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <div className="flex-1">
              <span className="text-slate-50 font-semibold">Wedge: </span>
              <span className="text-slate-300">starts as the autonomous QA layer for AI coding tools and agents.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <div className="flex-1">
              <span className="text-slate-50 font-semibold">Expansion: </span>
              <span className="text-slate-300">CI integration, compliance, reliability scoring, regression history.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <div className="flex-1">
              <span className="text-slate-50 font-semibold">Data moat: </span>
              <span className="text-slate-300">anonymized patterns of failures and flows across stacks.</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-amber-400 mt-1">•</span>
            <div className="flex-1">
              <span className="text-slate-50 font-semibold">Long-term: </span>
              <span className="text-slate-300">become the reliability backbone for AI-written production code and the automation engine for enterprise QA organizations.</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Target Markets</h3>
          <div className="space-y-4 text-slate-300">
            <div>
              <span className="font-semibold text-slate-50">1. AI Developers: </span>
              <span>Individual developers and teams using AI coding tools (Cursor, Claude Code, Copilot) who need autonomous QA to validate AI-generated code.</span>
            </div>
            <div>
              <span className="font-semibold text-slate-50">2. Enterprise QA Organizations: </span>
              <span>Companies looking to automate their QA operations, reduce manual testing overhead, and scale quality assurance across their engineering teams.</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Pricing</h3>
          <div className="space-y-3 text-slate-300">
            <p>
              Usage-based or seat-based with enterprise tiers for both developer and organizational use cases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForInvestors;

