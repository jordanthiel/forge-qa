const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-12 text-center">
          Under the hood: how Forge actually works.
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-2xl font-semibold text-slate-50">Spin up the environment</h3>
            </div>
            <p className="text-slate-300 text-lg ml-14">
              Forge checks out your repo, starts your app (via a config-defined command), waits for health checks, and exposes a base URL to the runner.
            </p>
            <div className="ml-14 bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <code className="text-slate-300">
                <div className="text-slate-500">$</div>
                <div>forge run \</div>
                <div className="ml-4">--start "npm run dev" \</div>
                <div className="ml-4">--base-url "http://localhost:3000" \</div>
                <div className="ml-4">--spec "./qa_specs.json"</div>
              </code>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-2xl font-semibold text-slate-50">Execute flows with vision model intelligence</h3>
            </div>
            <p className="text-slate-300 text-lg ml-14">
              Forge uses a vision model that can see and interact with your app like a real user. It plans steps from your specs using an LLM: navigate, click, type, and verify. It inspects the UI visually and through the DOM at each step.
            </p>
            <div className="ml-14 bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <code className="text-slate-300">
                <div>{'{'}</div>
                <div className="ml-4">
                  <span className="text-amber-400">"id"</span>: <span className="text-green-400">"channel_message_flow"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-amber-400">"steps"</span>: [
                </div>
                <div className="ml-8">{'{'}</div>
                <div className="ml-12">
                  <span className="text-amber-400">"action"</span>: <span className="text-green-400">"click"</span>,{' '}
                  <span className="text-amber-400">"selector"</span>: <span className="text-green-400">"text=#general"</span>
                </div>
                <div className="ml-8">{'},'}</div>
                <div className="ml-8">{'{'}</div>
                <div className="ml-12">
                  <span className="text-amber-400">"action"</span>: <span className="text-green-400">"fill"</span>,{' '}
                  <span className="text-amber-400">"selector"</span>: <span className="text-green-400">"textarea[placeholder*='Message']"</span>,{' '}
                  <span className="text-amber-400">"value"</span>: <span className="text-green-400">"Test draft"</span>
                </div>
                <div className="ml-8">{'},'}</div>
                <div className="ml-8">{'{'}</div>
                <div className="ml-12">
                  <span className="text-amber-400">"action"</span>: <span className="text-green-400">"click"</span>,{' '}
                  <span className="text-amber-400">"selector"</span>: <span className="text-green-400">"button:has-text('Send')"</span>
                </div>
                <div className="ml-8">{'}'}</div>
                <div className="ml-4">]</div>
                <div>{'}'}</div>
              </code>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-2xl font-semibold text-slate-50">Visual oracle + structured QA report</h3>
            </div>
            <p className="text-slate-300 text-lg ml-14">
              Forge captures screenshots and uses a vision LLM for visual requirements: modal margin, background blur, layout issues. It aggregates DOM, logs, and vision results into a structured QA report.
            </p>
            <div className="ml-14 bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <code className="text-slate-300">
                <div>{'{'}</div>
                <div className="ml-4">
                  <span className="text-amber-400">"test_id"</span>: <span className="text-green-400">"modal_layout"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-amber-400">"status"</span>: <span className="text-red-400">"fail"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-amber-400">"visual"</span>: {'{'}
                </div>
                <div className="ml-8">
                  <span className="text-amber-400">"modal_visible"</span>: <span className="text-blue-400">true</span>,
                </div>
                <div className="ml-8">
                  <span className="text-amber-400">"margin_looks_minimal"</span>: <span className="text-red-400">false</span>,
                </div>
                <div className="ml-8">
                  <span className="text-amber-400">"background_looks_blurred"</span>: <span className="text-red-400">false</span>,
                </div>
                <div className="ml-8">
                  <span className="text-amber-400">"notes"</span>: <span className="text-green-400">"Modal is small and centered with large margins."</span>
                </div>
                <div className="ml-4">{'},'}</div>
                <div className="ml-4">
                  <span className="text-amber-400">"summary_for_ai"</span>: <span className="text-green-400">"Modal layout does not match spec. Expand near edge-to-edge and enable backdrop blur."</span>
                </div>
                <div>{'}'}</div>
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

