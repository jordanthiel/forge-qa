const TeamCTA = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="bg-slate-950 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-6">
          We're assembling the founding team.
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed mb-8">
          Founding engineers (Python, TypeScript, devtools). ML/LLM/agents engineers. Design partner teams that heavily use AI coding tools.
        </p>
        <button
          onClick={() => scrollToSection('email-capture')}
          className="bg-amber-400 text-slate-950 px-8 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
        >
          Talk to us
        </button>
      </div>
    </section>
  );
};

export default TeamCTA;

