import { useState } from 'react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-semibold text-slate-50 hover:text-amber-400 transition-colors"
            >
              Forge
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('solution')}
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('why-now')}
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              Why Now
            </button>
            <button
              onClick={() => scrollToSection('engineers')}
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              For Engineers
            </button>
            <button
              onClick={() => scrollToSection('investors')}
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              For Investors
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection('email-capture')}
              className="bg-amber-400 text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-amber-300 transition-colors text-sm"
            >
              Get early access
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-amber-400 p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('solution')}
              className="block w-full text-left px-4 py-2 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('why-now')}
              className="block w-full text-left px-4 py-2 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Why Now
            </button>
            <button
              onClick={() => scrollToSection('engineers')}
              className="block w-full text-left px-4 py-2 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              For Engineers
            </button>
            <button
              onClick={() => scrollToSection('investors')}
              className="block w-full text-left px-4 py-2 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              For Investors
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="block w-full text-left px-4 py-2 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection('email-capture')}
              className="block w-full text-left px-4 py-2 bg-amber-400 text-slate-950 rounded-lg font-medium hover:bg-amber-300 transition-colors mt-2"
            >
              Get early access
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;

