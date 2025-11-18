import { useState } from 'react';
import { supabase } from '../lib/supabase';
import mixpanel from 'mixpanel-browser';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [rating, setRating] = useState<number>(5);
  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('feedback')
        .insert([
          {
            rating: rating,
            likes: likes.trim() || null,
            dislikes: dislikes.trim() || null,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      // Track with Mixpanel
      mixpanel.track('Feedback Submitted', {
        rating: rating,
        has_likes: !!likes.trim(),
        has_dislikes: !!dislikes.trim(),
      });

      setSubmitted(true);
      // Close modal after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(5);
    setLikes('');
    setDislikes('');
    setSubmitted(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-50">Share Your Feedback</h2>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-50 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-2">Thank you for your feedback!</h3>
              <p className="text-slate-300">Your input helps us improve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-slate-300 mb-2">
                  How would you rate this product idea? <span className="text-red-400">*</span>
                  {rating && <span className="ml-2 text-amber-400">({rating}/10)</span>}
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    id="rating"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
                          rating === num
                            ? 'bg-amber-400 text-slate-950 scale-110'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Not interested</span>
                  <span>Very interested</span>
                </div>
              </div>

              <div>
                <label htmlFor="likes" className="block text-sm font-medium text-slate-300 mb-2">
                  What do you like about this product idea?
                </label>
                <textarea
                  id="likes"
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                  placeholder="What excites you? What problems would it solve?"
                />
              </div>

              <div>
                <label htmlFor="dislikes" className="block text-sm font-medium text-slate-300 mb-2">
                  What concerns you or what don't you like?
                </label>
                <textarea
                  id="dislikes"
                  value={dislikes}
                  onChange={(e) => setDislikes(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                  placeholder="What worries you? What would prevent you from using this?"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-slate-700 text-slate-50 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-400 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

