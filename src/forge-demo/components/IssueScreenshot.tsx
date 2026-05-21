import { issueCaptureState } from '../data/issueCaptures';
import type { ForgeIssue } from '../types';
import { AcmeCloudApp } from './AcmeCloudApp';

interface Props {
  issue: ForgeIssue;
  className?: string;
}

export function IssueScreenshot({ issue, className = '' }: Props) {
  const capture = issueCaptureState[issue.id] ?? {
    preview: { mode: 'web' as const, browser: 'Chrome', viewport: 'Desktop · 1440px' },
    screen: issue.screen,
  };

  return (
    <div
      className={`relative rounded-lg border border-zinc-700 bg-zinc-900 overflow-hidden ${className}`}
    >
      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-black/70 text-[9px] text-zinc-300 font-mono">
        Screenshot · {issue.browserDevice}
      </div>
      <div className="h-full w-full min-h-[140px] max-h-[200px] overflow-hidden pointer-events-none select-none">
        <div className="origin-top-left scale-[0.55] w-[182%] h-[182%]">
          <div className="h-[320px] w-[280px] rounded-lg overflow-hidden border border-zinc-800 shadow-inner">
            <AcmeCloudApp
              screen={capture.screen}
              preview={capture.preview}
              highlightIssueId={issue.id}
              large
              typedText={capture.typedText ?? ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
