import type { AppScreen, PreviewContext } from '../types';

/** Visual state for each issue’s screenshot thumbnail in the results modal. */
export const issueCaptureState: Record<
  string,
  { preview: PreviewContext; screen: AppScreen; typedText?: string }
> = {
  'issue-1': {
    preview: { mode: 'web', browser: 'Chrome', viewport: 'Mobile · iPhone 14' },
    screen: 'welcome',
  },
  'issue-2': {
    preview: { mode: 'web', browser: 'Safari', viewport: 'Desktop · 1440px' },
    screen: 'welcome',
  },
  'issue-3': {
    preview: { mode: 'web', browser: 'Firefox', viewport: 'Tablet · 768px' },
    screen: 'invite',
    typedText: 'not-an-email',
  },
  'issue-4': {
    preview: { mode: 'web', browser: 'Chrome', viewport: 'Desktop · 1440px' },
    screen: 'dashboard',
  },
  'issue-5': {
    preview: { mode: 'web', browser: 'Edge', viewport: 'Desktop · 1440px' },
    screen: 'upgrade',
  },
  'issue-6': {
    preview: { mode: 'web', browser: 'Chrome', viewport: 'Desktop · 1440px' },
    screen: 'welcome',
  },
  'issue-7': {
    preview: { mode: 'ios', device: 'iPhone SE' },
    screen: 'welcome',
  },
  'issue-8': {
    preview: { mode: 'ios', device: 'iPhone 14' },
    screen: 'workspace',
    typedText: 'acme-ios',
  },
  'issue-9': {
    preview: { mode: 'android', device: 'Pixel 7' },
    screen: 'workspace',
    typedText: 'acme-android',
  },
  'issue-10': {
    preview: { mode: 'android', device: 'Galaxy S22' },
    screen: 'welcome',
  },
};
