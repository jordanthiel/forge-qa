import { useState } from 'react';
import { supabase } from '../lib/supabase';
import mixpanel from 'mixpanel-browser';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (email) {
      try {
        // Insert into Supabase
        const { error: insertError } = await supabase
          .from('early_access_requests')
          .insert([
            {
              email: email.trim(),
              workflow: workflow.trim() || null,
            },
          ])
          .select();

        if (insertError) {
          throw insertError;
        }

        // Track with Mixpanel
        mixpanel.track('Early Access Request', {
          email: email.trim(),
          has_workflow: !!workflow.trim(),
        });

        setSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setEmail('');
          setWorkflow('');
          setSubmitted(false);
        }, 5000);
      } catch (err) {
        console.error('Error submitting early access request:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="email-capture" className="bg-slate-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
            Get early access to Forge.
          </h2>
          <p className="text-lg text-slate-300">
            Share your email and how you're using AI in your development workflow.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <label htmlFor="workflow" className="block text-sm font-medium text-slate-300 mb-2">
                How do you use AI to build today?
              </label>
              <textarea
                id="workflow"
                value={workflow}
                onChange={(e) => setWorkflow(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                placeholder="Tell us about your AI development workflow..."
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
              className="w-full bg-amber-400 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get early access'}
            </button>
          </form>
        ) : (
          <div className="bg-slate-950 border border-green-500/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-50 mb-2">Thanks, we'll be in touch.</h3>
            <p className="text-slate-300">We've received your information and will reach out soon.</p>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400">
            <div className="mb-4 sm:mb-0">
              © {new Date().getFullYear()} Forge. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default EmailCapture;

