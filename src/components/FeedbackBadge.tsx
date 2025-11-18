import { useState, useEffect, useRef } from 'react';
import FeedbackModal from './FeedbackModal';

const FeedbackBadge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPassedProductSection, setHasPassedProductSection] = useState(false);
  const [hasBeenOnPage, setHasBeenOnPage] = useState(false);
  const hasAutoOpenedRef = useRef(false);
  const timeOnPageRef = useRef(0);

  useEffect(() => {
    // Check if modal has already been auto-opened in this session
    const hasAutoOpened = sessionStorage.getItem('feedbackModalAutoOpened');
    if (hasAutoOpened === 'true') {
      hasAutoOpenedRef.current = true;
      return;
    }

    // Set up intersection observer to detect when user scrolls past solution section
    const solutionSection = document.getElementById('solution');
    if (!solutionSection) return;

    // Check if already scrolled past on mount
    const checkScrollPosition = () => {
      const rect = solutionSection.getBoundingClientRect();
      if (rect.top < -100) {
        setHasPassedProductSection(true);
        return true;
      }
      return false;
    };

    // Check immediately
    const alreadyPast = checkScrollPosition();

    let observer: IntersectionObserver | null = null;
    let handleScroll: (() => void) | null = null;

    if (!alreadyPast) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If the solution section has been scrolled past (top of section is above viewport)
            if (entry.boundingClientRect.top < -100) {
              setHasPassedProductSection(true);
              observer?.disconnect(); // Stop observing once condition is met
            }
          });
        },
        {
          threshold: [0, 0.1, 0.5, 1],
        }
      );

      observer.observe(solutionSection);

      // Also add scroll listener as fallback
      handleScroll = () => {
        if (checkScrollPosition()) {
          observer?.disconnect();
          if (handleScroll) {
            window.removeEventListener('scroll', handleScroll);
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Set up timer to track time on page (30 seconds)
    const timer = setInterval(() => {
      timeOnPageRef.current += 1;
      if (timeOnPageRef.current >= 30) {
        setHasBeenOnPage(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      observer?.disconnect();
      clearInterval(timer);
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Auto-open modal when conditions are met
  useEffect(() => {
    if (
      hasPassedProductSection &&
      hasBeenOnPage &&
      !hasAutoOpenedRef.current &&
      !isModalOpen
    ) {
      hasAutoOpenedRef.current = true;
      sessionStorage.setItem('feedbackModalAutoOpened', 'true');
      setIsModalOpen(true);
    }
  }, [hasPassedProductSection, hasBeenOnPage, isModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-amber-400 text-slate-950 px-4 py-3 rounded-full shadow-lg hover:bg-amber-300 transition-all hover:scale-105 flex items-center gap-2 font-semibold"
        aria-label="Share feedback"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
        <span className="hidden sm:inline">Feedback</span>
      </button>
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FeedbackBadge;

