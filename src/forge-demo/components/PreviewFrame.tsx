import { useRef } from 'react';
import type { PreviewContext, AppScreen, FlowActionType } from '../types';
import { AcmeCloudApp } from './AcmeCloudApp';
import { ClickIndicator } from './ClickIndicator';
import { FlowBanner } from './FlowBanner';
import { StepActionOverlay } from './StepActionOverlay';
import type { DemoPhase, DemoStep } from '../types';

interface Props {
  preview: PreviewContext;
  screen: AppScreen;
  highlightIssueId: string | null;
  expanded?: boolean;
  actionTarget?: string | null;
  action?: FlowActionType | null;
  typedText?: string;
  flowName?: string | null;
  flowStep?: string | null;
  phase?: DemoPhase;
  currentStep?: DemoStep | null;
  stepNumber?: number;
  totalSteps?: number;
}

function deviceSizeClass(preview: PreviewContext, expanded: boolean) {
  const h = expanded ? 'h-[96%]' : 'h-[90%]';
  const isMobile = preview.mode === 'web' && preview.viewport?.includes('iPhone');
  const isTablet = preview.mode === 'web' && preview.viewport?.includes('Tablet');
  if (preview.mode === 'ios') {
    if (preview.device === 'iPad') return `${h} aspect-[4/5]`;
    if (preview.device === 'iPhone SE') return `${h} aspect-[9/18]`;
    return `${h} aspect-[9/19]`;
  }
  if (preview.mode === 'android') return `${h} aspect-[9/19]`;
  if (isMobile) return `${h} aspect-[9/19]`;
  if (isTablet) return `${h} aspect-[3/4]`;
  return `${h} aspect-[16/10] max-w-[96%]`;
}

function AppViewport({
  preview,
  screen,
  highlightIssueId,
  expanded,
  actionTarget,
  action,
  typedText,
  flowName,
  flowStep,
  phase = 'idle',
  currentStep = null,
  stepNumber = 0,
  totalSteps = 1,
  insetNative,
}: Props & { insetNative?: boolean }) {
  const appRef = useRef<HTMLDivElement>(null);
  const actionLabel =
    action === 'click'
      ? 'Clicking…'
      : action === 'type'
        ? 'Typing…'
        : action === 'navigate'
          ? 'Navigating…'
          : action === 'observe'
            ? 'Inspecting…'
            : null;

  const shellClass = insetNative
    ? 'h-full w-full border-0 rounded-none shadow-none'
    : `rounded-xl border border-zinc-700 shadow-2xl w-auto ${deviceSizeClass(preview, !!expanded)}`;

  return (
    <div className={`relative overflow-hidden bg-white ${shellClass}`}>
      <FlowBanner flowName={flowName ?? null} flowStep={flowStep ?? null} actionLabel={actionLabel} />
      <StepActionOverlay
        step={currentStep}
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        phase={phase}
      />
      <div ref={appRef} className="h-full w-full relative overflow-hidden">
        <AcmeCloudApp
          screen={screen}
          preview={preview}
          highlightIssueId={highlightIssueId}
          large={expanded}
          typedText={typedText}
          activeTarget={actionTarget}
        />
        <ClickIndicator target={actionTarget ?? null} action={action ?? null} containerRef={appRef} />
      </div>
    </div>
  );
}

function WebBrowserFrame(props: Props) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800/80 bg-zinc-900/60 shrink-0">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-500 font-mono truncate">
          preview-acme-cloud.vercel.app/onboarding
        </div>
      </div>
      <div className="flex flex-wrap gap-2 px-3 py-2 border-b border-zinc-800/60 text-[11px] shrink-0">
        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
          {props.preview.browser}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/30">
          {props.preview.viewport}
        </span>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center p-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black">
        <AppViewport {...props} />
      </div>
    </div>
  );
}

function IOSFrame(props: Props) {
  const compact = props.preview.device === 'iPhone SE';
  const tablet = props.preview.device === 'iPad';
  const frameAspect = tablet ? 'aspect-[4/5]' : compact ? 'aspect-[9/18]' : 'aspect-[9/19]';

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex justify-center gap-2 py-2 text-[11px] shrink-0 border-b border-zinc-800/60">
        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
          React Native · iOS
        </span>
        <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/30">
          {props.preview.device}
        </span>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center p-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
        <div
          className={`relative h-[96%] w-auto max-w-[96%] rounded-[2rem] border-[3px] border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden ${frameAspect}`}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 pointer-events-none" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-600 rounded-full z-20 pointer-events-none" />
          <div className="h-full pt-7 pb-2 overflow-hidden rounded-[1.75rem]">
            <AppViewport {...props} insetNative />
          </div>
        </div>
      </div>
    </div>
  );
}

function AndroidFrame(props: Props) {
  const samsung = props.preview.device === 'Galaxy S22';

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex justify-center gap-2 py-2 text-[11px] shrink-0 border-b border-zinc-800/60">
        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
          React Native · Android
        </span>
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          {props.preview.device}
        </span>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center p-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
        <div className="relative h-[96%] w-auto max-w-[96%] aspect-[9/19] rounded-[1.25rem] border-2 border-zinc-600 bg-zinc-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-7 bg-zinc-900 flex items-center justify-center z-20 pointer-events-none">
            <span className="text-[10px] text-zinc-500">12:41</span>
            {samsung && <span className="absolute right-3 text-[10px] text-zinc-600">Dark</span>}
          </div>
          <div className="h-full pt-7 pb-1 overflow-hidden">
            <AppViewport {...props} insetNative />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewFrame(props: Props) {
  if (props.preview.mode === 'ios') return <IOSFrame {...props} />;
  if (props.preview.mode === 'android') return <AndroidFrame {...props} />;
  return <WebBrowserFrame {...props} />;
}
