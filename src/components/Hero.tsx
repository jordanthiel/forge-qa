const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center bg-slate-950 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 leading-tight">
                The autonomous QA engine for AI-built software.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                Forge runs your app in a real browser, uses a vision model to execute critical user flows like a real user would, visually inspects the UI (including modals, spacing, background blur, etc.), and sends structured failure reports back to AI coding agents so they can automatically fix issues.
              </p>
            </div>

            {/* Value Props */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <p className="text-slate-300">Runs your app like a real user – not just unit tests.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <p className="text-slate-300">Combines DOM, logs, and screenshots with a vision LLM for visual QA.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <p className="text-slate-300">Feeds fix-ready reports directly into AI coding agents.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('email-capture')}
                className="bg-amber-400 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
              >
                Get early access
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="border border-slate-700 text-slate-50 px-6 py-3 rounded-lg font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Right Column - Hero Visualization */}
          <div className="hidden lg:block">
            <div className="space-y-4">
              {/* Mock Browser Window */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2 border-b border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="flex-1 bg-slate-950 rounded px-3 py-1 mx-4 text-xs text-slate-400">
                    localhost:3000
                  </div>
                </div>
                <div className="p-6 bg-slate-950 min-h-[200px]">
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-800 rounded w-1/2" />
                    <div className="h-20 bg-slate-800 rounded mt-4" />
                  </div>
                </div>
              </div>

              {/* Mock QA Report Card */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-50">Forge QA Report</h3>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">
                    FAIL
                  </span>
                </div>
                <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 font-mono text-xs">
                  <div className="text-slate-400">
                    <div className="mb-2">
                      <span className="text-amber-400">"test_id"</span>: <span className="text-slate-300">"modal_layout"</span>,
                    </div>
                    <div className="mb-2">
                      <span className="text-amber-400">"status"</span>: <span className="text-red-400">"fail"</span>,
                    </div>
                    <div>
                      <span className="text-amber-400">"visual"</span>: {'{'}
                    </div>
                    <div className="ml-4 text-slate-300">
                      "modal_margin_minimal": <span className="text-red-400">false</span>
                    </div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

