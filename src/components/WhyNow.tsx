const WhyNow = () => {
  return (
    <section id="why-now" className="bg-slate-950 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-12 text-center">
          Why Forge now?
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              AI coding agents are becoming excellent at writing code, but not at validating products. Teams don't fully trust AI-built features without robust QA. Existing testing tools weren't built for AI-driven, high-frequency iteration or nuanced visual requirements. Meanwhile, enterprise QA organizations are struggling to scale manual testing and need automation that understands context like a human tester.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-slate-300">Explosion of AI-assisted development (Cursor, Claude Code, Copilot, etc.).</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-slate-300">No standard way to feed rich, environment-aware QA feedback back into these agents.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-slate-300">Forge serves both AI developers and enterprise QA teams with vision-based autonomous testing.</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-amber-400 mb-2">20M+</div>
              <div className="text-slate-300">developers use AI dev tools.</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-amber-400 mb-2">60–80%</div>
              <div className="text-slate-300">of cycle time still in testing & debugging.</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-amber-400 mb-2">Top source</div>
              <div className="text-slate-300">of user friction: Visual/UI issues.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNow;

