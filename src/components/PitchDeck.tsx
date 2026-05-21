import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import mixpanel from 'mixpanel-browser';

interface Slide {
  id: number;
  content: ReactElement;
}

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('early_access_requests')
        .insert([
          {
            email: email.trim(),
            workflow: `Pitch Deck Contact - Name: ${name.trim()}, Company: ${company.trim()}, Message: ${message.trim()}`,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      mixpanel.track('Pitch Deck Contact Form', {
        email: email.trim(),
        has_name: !!name.trim(),
        has_company: !!company.trim(),
      });

      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-24 py-16 overflow-y-auto" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
      <div className="max-w-2xl w-full">
        <h2 className="text-5xl font-bold text-slate-50 mb-4 text-center">
          Let's Build the Future of QA Together
        </h2>
        <p className="text-2xl text-amber-400 mb-8 font-semibold text-center">
          Get in Touch
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Your company"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                placeholder="Interested in learning more, investing, or partnering?"
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 text-slate-950 px-8 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>
          </form>
        ) : (
          <div className="bg-slate-900 border border-green-500/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-50 mb-2">Thanks, we'll be in touch.</h3>
            <p className="text-slate-300">We've received your message and will reach out soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [viewportScale, setViewportScale] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const minSwipeDistance = 50;
  const totalSlides = 11;

  // Uniform scale: fixed 1920×1080 canvas letterboxed into the viewport
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateScale = () => {
      const { width, height } = viewport.getBoundingClientRect();
      setViewportScale(Math.min(width / SLIDE_WIDTH, height / SLIDE_HEIGHT));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, totalSlides]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      goToNextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      goToPreviousSlide();
    }
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Slide content
  const slides: Slide[] = [
    {
      id: 0,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full text-center px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h1 className="text-8xl font-bold text-slate-50 mb-8 leading-tight">Forge</h1>
          <p className="text-4xl text-amber-400 mb-12 font-semibold">
            The Autonomous QA Engine for AI-Built Software
          </p>
          <p className="text-2xl text-slate-300 max-w-4xl">The missing piece in writing software with AI.</p>
        </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">The Problem</h2>
          <div className="w-full max-w-7xl space-y-8" style={{ maxHeight: '100%', overflow: 'hidden' }}>
            <p className="text-3xl text-slate-300 text-center leading-relaxed mb-12">
              AI can write code fast. Testing it is still painfully manual.
            </p>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold text-slate-50 mb-6 text-center">Current Process</h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-6 py-3 text-lg font-medium text-slate-200">
                  Developer Prompts
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-6 py-3 text-lg font-medium text-slate-200">
                  AI Writes Code
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-3 text-lg font-medium text-red-300">
                  Developer Tests
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-3 text-lg font-medium text-red-300">
                  Developer Re-prompts
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-6 py-3 text-lg font-medium text-slate-200">
                  Developer Ships
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-3 text-lg font-medium text-red-300">
                  QA Teams Test E2E
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-amber-400 text-5xl font-bold mb-4">80%</div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">Manual Testing Bottleneck</h3>
                <p className="text-slate-300 text-lg">
                  Every feature requires 30-60 minutes of manual QA. Developers spend 60-80% of their cycle time
                  testing AI-generated code and re-prompting.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-amber-400 text-5xl font-bold mb-4">❌</div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">Issues Slip Through</h3>
                <p className="text-slate-300 text-lg">
                  Visual and functionality issues slip through because no tool tests how users actually experience the
                  product. Traditional tests miss real user experience problems.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-amber-400 text-5xl font-bold mb-4">🤖</div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">AI Agents Lack Awareness</h3>
                <p className="text-slate-300 text-lg">
                  AI agents lack real environment awareness. They can't validate how code actually works in a real
                  browser or how users will experience it.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">The Solution</h2>
          <div className="w-full max-w-7xl space-y-8" style={{ maxHeight: '100%', overflow: 'hidden' }}>
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-8">
              <p className="text-3xl text-amber-400 text-center font-semibold">
                Tests like a real user would experience your product
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-slate-50 mb-6 text-center">
                Automated Process with Forge
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-6 py-3 text-lg font-medium text-slate-200">
                  Developer Prompts
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-6 py-3 text-lg font-medium text-slate-200">
                  AI Writes Code
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-amber-400/20 border border-amber-400/50 rounded-lg px-6 py-3 text-lg font-medium text-amber-300">
                  Forge Tests
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-slate-800 border border-slate-600 rounded-lg px-6 py-3 text-lg font-medium text-slate-200">
                  AI Fixes Issues
                </div>
                <svg
                  className="w-8 h-8 text-slate-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg px-6 py-3 text-lg font-medium text-green-300">
                  Deploy
                </div>
              </div>
              <p className="text-lg text-slate-400 text-center mt-6">
                Automated loop: Test plans develop as code is written → Forge tests like a real user → AI fixes issues
                automatically
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-4xl mb-6">🌐</div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">Real User Experience</h3>
                <p className="text-slate-300 text-lg">
                  Runs your app in a real browser or simulator. Vision model interacts exactly like a human user
                  would—clicks, types, navigates, and experiences the product as users do.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-4xl mb-6">🤝</div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">AI IDE Integration</h3>
                <p className="text-slate-300 text-lg">
                  Works closely with AI IDEs to develop test plans as developers build. Test plans evolve with your
                  code in real-time.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-4xl mb-6">📊</div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">Fix-Ready Reports</h3>
                <p className="text-slate-300 text-lg">
                  Structured JSON feedback that AI agents consume for precise fixes. Reports capture real user
                  experience issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">
            Market Opportunity
          </h2>
          <div className="max-w-4xl w-full space-y-8">
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-4 text-center">
                One Problem, Two Markets
              </h3>
              <p className="text-lg text-slate-300 text-center mb-6">
                The same testing bottleneck affects both individual AI developers and enterprise QA teams
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-5xl font-bold text-amber-400 mb-4">20M+</div>
                <div className="text-xl text-slate-300 mb-2">AI Developers</div>
                <div className="text-sm text-slate-400 mb-4">Cursor, Claude Code, Copilot</div>
                <div className="text-sm text-slate-300 border-t border-slate-700 pt-4">
                  Need autonomous QA to validate AI-generated code in real-time
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="text-5xl font-bold text-amber-400 mb-4">$50B+</div>
                <div className="text-xl text-slate-300 mb-2">Enterprise QA Market</div>
                <div className="text-sm text-slate-400 mb-4">Growing automation demand</div>
                <div className="text-sm text-slate-300 border-t border-slate-700 pt-4">
                  Need to scale QA operations and reduce manual testing overhead
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <p className="text-lg text-slate-50 text-center font-semibold mb-2">
                The Connection
              </p>
              <p className="text-base text-slate-300 text-center">
                As AI developers scale within organizations, their autonomous QA needs become enterprise QA
                requirements. The same vision-based testing technology serves both.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">
            Why Now?
          </h2>
          <div className="max-w-4xl space-y-6">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">
                Perfect Timing
              </h3>
              <ul className="space-y-3 text-base text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>Explosion of AI-assisted development tools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>No standard way to feed QA feedback into AI agents or develop test plans during development</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>Vision LLMs enable real user experience testing at scale</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>AI IDEs are ready for deep integration with QA tools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>Enterprise QA teams need automation that understands context</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">Top Source</div>
                <div className="text-sm text-slate-300 mt-2">
                  of user friction: Visual/UI issues
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">Vision LLM</div>
                <div className="text-sm text-slate-300 mt-2">Technology now mature enough</div>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">AI Native</div>
                <div className="text-sm text-slate-300 mt-2">Built for AI-driven workflows</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">
            Product Differentiation
          </h2>
          <div className="max-w-4xl space-y-6">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">
                What Makes Forge Unique
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-lg font-semibold text-slate-50 mb-2">
                    ✓ Real User Experience Testing
                  </div>
                  <p className="text-slate-300 text-sm">
                    Tests exactly like a real user would experience your product—not scripted clicks, but genuine user
                    interactions and perceptions
                  </p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-50 mb-2">
                    ✓ AI IDE Integration
                  </div>
                  <p className="text-slate-300 text-sm">
                    Works closely with AI IDEs to develop test plans as developers build. Test plans evolve with your
                    code in real-time
                  </p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-50 mb-2">
                    ✓ Vision-Based QA
                  </div>
                  <p className="text-slate-300 text-sm">
                    Not just DOM assertions - understands visual context like spacing, blur, layout the way users
                    actually see it
                  </p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-50 mb-2">
                    ✓ Autonomous Loop
                  </div>
                  <p className="text-slate-300 text-sm">
                    Complete Build → Test → Fix cycle without human intervention. Test plans auto-generate as code is
                    written
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6">
              <p className="text-lg text-slate-50 text-center mb-2">
                Existing tools weren't built for AI-driven, high-frequency iteration or nuanced visual requirements
              </p>
              <p className="text-slate-300 text-center text-sm">
                Forge is the only solution that tests like real users and integrates test planning directly into the AI
                development workflow
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">
            Business Model
          </h2>
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">Developer Tier</h3>
                <ul className="space-y-2 text-slate-300 text-sm mb-3">
                  <li>• Usage-based pricing</li>
                  <li>• Per-test or per-run model</li>
                </ul>
                <div className="text-xs text-slate-400 border-t border-slate-700 pt-3">
                  Entry point for AI developers
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">Enterprise Tier</h3>
                <ul className="space-y-2 text-slate-300 text-sm mb-3">
                  <li>• Seat-based + usage pricing</li>
                  <li>• Volume discounts</li>
                </ul>
                <div className="text-xs text-slate-400 border-t border-slate-700 pt-3">
                  Natural upgrade as teams scale
                </div>
              </div>
            </div>
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5">
              <p className="text-slate-300 text-center text-sm">
                Developers start with usage-based pricing. As teams adopt and scale, they transition to enterprise
                contracts. Same product, seamless upgrade path.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">
            Go-to-Market Strategy
          </h2>
          <div className="max-w-5xl space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Path 1: Developer → Enterprise</h3>
                <div className="space-y-2 text-slate-300 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <div>AI developers adopt individually</div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <div>Teams adopt, becomes standard</div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <div>Organizations scale to enterprise</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Path 2: Direct to Organizations</h3>
                <div className="space-y-2 text-slate-300 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <div>Target enterprise QA organizations directly</div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <div>Help streamline and scale their QA efforts</div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <div>Reduce manual testing overhead</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5">
              <p className="text-slate-300 text-center text-sm">
                Both paths work in parallel. Developer adoption creates enterprise demand, while direct enterprise sales
                validate and strengthen the developer use case.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                <h4 className="font-semibold text-slate-50 mb-2 text-sm">Synergistic Growth</h4>
                <p className="text-slate-300 text-xs">
                  Both paths strengthen each other and create a data moat from failure patterns across markets.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                <h4 className="font-semibold text-slate-50 mb-2 text-sm">Dual Approach</h4>
                <p className="text-slate-300 text-xs">
                  Not just a natural growth path—we actively pursue both developer adoption and enterprise contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">
            Investment Opportunity
          </h2>
          <div className="max-w-4xl w-full space-y-8">
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-amber-400 mb-4">Why Invest in Forge?</h3>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="text-3xl font-bold text-slate-50 mb-2">Unified Market</div>
                  <div className="text-slate-300">
                    One product serving 20M+ developers and $50B+ enterprise QA market
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-50 mb-2">Synergistic Growth</div>
                  <div className="text-slate-300">
                    Developer adoption drives enterprise demand, and vice versa
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-50 mb-2">Perfect Timing</div>
                  <div className="text-slate-300">AI-native infrastructure at inflection point</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-50 mb-2">Defensible Moat</div>
                  <div className="text-slate-300">
                    Data network effects from both markets create compounding advantage
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">The Unified Vision</h3>
              <p className="text-lg text-slate-300 text-center mb-4">
                One platform that starts with individual AI developers and scales to enterprise QA organizations
              </p>
              <p className="text-slate-400 text-center">
                The same vision-based autonomous testing technology that validates AI-generated code for developers
                becomes the reliability backbone for entire QA operations at scale
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      content: (
        <div className="flex flex-col items-center justify-center h-full w-full px-24 py-16" data-slide-content style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <h2 className="text-6xl font-bold text-slate-50 mb-12 text-center">The Team</h2>
          <div className="max-w-4xl space-y-6">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-4 text-center">
                We're Assembling the Founding Team
              </h3>
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-2xl mb-2">👨‍💻</div>
                  <h4 className="text-base font-semibold text-slate-50 mb-2">
                    Founding Engineers
                  </h4>
                  <p className="text-slate-300 text-sm">Python, TypeScript, devtools expertise</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🤖</div>
                  <h4 className="text-base font-semibold text-slate-50 mb-2">
                    ML/LLM Engineers
                  </h4>
                  <p className="text-slate-300 text-sm">Vision models, AI agents, autonomous systems</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🤝</div>
                  <h4 className="text-base font-semibold text-slate-50 mb-2">Design Partners</h4>
                  <p className="text-slate-300 text-sm">Teams that heavily use AI coding tools</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5">
              <p className="text-slate-300 text-center text-sm">
                Building a team that understands both the technical challenges and the real-world needs of AI-native
                development
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      content: <ContactForm />,
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-amber-400 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Letterboxed 16:9 viewport — black bars fill the rest of the screen */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={viewportRef}
          className="relative overflow-hidden bg-slate-950"
          style={{
            width: 'min(100vw, calc(100vh * 16 / 9))',
            height: 'min(100vh, calc(100vw * 9 / 16))',
          }}
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
              transform: `translate(-50%, -50%) scale(${viewportScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div
              ref={slideContainerRef}
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                width: SLIDE_WIDTH * totalSlides,
                transform: `translateX(-${currentSlide * SLIDE_WIDTH}px)`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="flex-shrink-0 overflow-hidden"
                  style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}
                >
                  {slide.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPreviousSlide}
        disabled={currentSlide === 0}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-50 p-2 sm:p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all z-40"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        disabled={currentSlide === totalSlides - 1}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-50 p-2 sm:p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all z-40"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-amber-400 w-6 sm:w-8'
                : 'bg-slate-600 hover:bg-slate-500 w-1.5 sm:w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-slate-900/80 border border-slate-700 text-slate-300 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm z-40">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Exit Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm transition-all z-40"
        aria-label="Exit pitch deck"
      >
        ← Back
      </button>
    </div>
  );
};

export default PitchDeck;
