import type { AppScreen, PreviewContext } from '../types';

interface Props {
  screen: AppScreen;
  preview: PreviewContext;
  highlightIssueId: string | null;
  large?: boolean;
  typedText?: string;
  activeTarget?: string | null;
}

function targetClass(id: string, active: string | null | undefined, large: boolean) {
  const base = large ? 'transition-all duration-200' : 'transition-all duration-200';
  const ring =
    active === id ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-transparent scale-[1.02]' : '';
  return `${base} ${ring}`;
}

function isSafariDesktop(preview: PreviewContext) {
  return preview.mode === 'web' && preview.browser === 'Safari';
}

function isFirefoxTablet(preview: PreviewContext) {
  return preview.mode === 'web' && preview.browser === 'Firefox';
}

function isChromeMobile(preview: PreviewContext) {
  return (
    preview.mode === 'web' &&
    preview.browser === 'Chrome' &&
    preview.viewport?.includes('iPhone 14')
  );
}

function isEdgeDesktop(preview: PreviewContext) {
  return preview.mode === 'web' && preview.browser === 'Edge';
}

function isIphoneSE(preview: PreviewContext) {
  return preview.mode === 'ios' && preview.device === 'iPhone SE';
}

function isIphone14Native(preview: PreviewContext) {
  return preview.mode === 'ios' && preview.device === 'iPhone 14';
}

function isPixel7(preview: PreviewContext) {
  return preview.mode === 'android' && preview.device === 'Pixel 7';
}

function isGalaxyDark(preview: PreviewContext) {
  return preview.mode === 'android' && preview.device === 'Galaxy S22';
}

export function AcmeCloudApp({
  screen,
  preview,
  highlightIssueId,
  large = false,
  typedText = '',
  activeTarget,
}: Props) {
  const native = preview.mode !== 'web';
  const dark = isGalaxyDark(preview);
  const showKeyboard = isPixel7(preview) && screen === 'workspace' && typedText.length > 0;

  const shell = dark
    ? 'bg-zinc-950 text-zinc-100'
    : native
      ? 'bg-white text-zinc-900'
      : 'bg-slate-50 text-slate-900';

  const text = large ? 'text-base' : 'text-sm';
  const small = large ? 'text-sm' : 'text-xs';
  const tiny = large ? 'text-xs' : 'text-[10px]';
  const btn = large ? 'py-3.5 text-base' : 'py-2 text-xs';

  return (
    <div className={`relative h-full min-h-0 flex flex-col overflow-hidden ${shell} ${large ? 'text-[15px]' : ''}`}>
      <header
        className={`sticky top-0 z-20 flex items-center justify-between px-4 py-2.5 border-b shrink-0 ${
          dark ? 'bg-zinc-900 border-zinc-800' : 'bg-white/90 backdrop-blur border-slate-200'
        } ${isSafariDesktop(preview) && screen === 'welcome' ? 'shadow-md' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className={`rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 ${large ? 'w-8 h-8' : 'w-6 h-6'}`} />
          <span className={`font-semibold tracking-tight ${text}`}>Acme Cloud</span>
        </div>
        <span className={tiny + ' text-zinc-500'}>Preview</span>
      </header>

      <div className={`flex-1 min-h-0 overflow-auto relative ${showKeyboard ? 'pb-32' : ''}`}>
        <div
          key={screen}
          className="h-full animate-[fadeSlide_0.35s_ease-out] motion-reduce:animate-none"
        >
          {screen === 'welcome' && (
            <WelcomeScreen
              preview={preview}
              highlightIssueId={highlightIssueId}
              dark={dark}
              large={large}
              small={small}
              tiny={tiny}
              btn={btn}
              activeTarget={activeTarget}
            />
          )}
          {screen === 'workspace' && (
            <WorkspaceScreen
              preview={preview}
              highlightIssueId={highlightIssueId}
              dark={dark}
              text={text}
              tiny={tiny}
              btn={btn}
              typedText={typedText}
              activeTarget={activeTarget}
            />
          )}
          {screen === 'invite' && (
            <InviteScreen
              preview={preview}
              highlightIssueId={highlightIssueId}
              dark={dark}
              text={text}
              tiny={tiny}
              btn={btn}
              typedText={typedText}
              activeTarget={activeTarget}
            />
          )}
          {screen === 'dashboard' && (
            <DashboardScreen
              highlightIssueId={highlightIssueId}
              dark={dark}
              text={text}
              small={small}
              activeTarget={activeTarget}
            />
          )}
          {screen === 'upgrade' && (
            <UpgradeScreen
              preview={preview}
              highlightIssueId={highlightIssueId}
              large={large}
              activeTarget={activeTarget}
            />
          )}
        </div>
      </div>

      {showKeyboard && (
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-zinc-800 border-t border-zinc-700 flex items-end justify-center pb-2 z-30">
          <div className="w-[92%] h-20 rounded-lg bg-zinc-700/80 grid grid-cols-10 gap-1 p-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="rounded bg-zinc-600/60 h-2.5" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WelcomeScreen({
  preview,
  highlightIssueId,
  dark,
  large,
  small,
  tiny,
  btn,
  activeTarget,
}: {
  preview: PreviewContext;
  highlightIssueId: string | null;
  dark: boolean;
  large: boolean;
  small: string;
  tiny: string;
  btn: string;
  activeTarget?: string | null;
}) {
  const mobileFold = isChromeMobile(preview);
  const safariClip = isSafariDesktop(preview);
  const safeAreaBug = isIphoneSE(preview);
  const lowContrast = isGalaxyDark(preview);

  return (
    <div className="relative min-h-full">
      <div
        className={`bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 px-5 ${
          large ? 'h-36 pt-8' : 'h-28 pt-6'
        } ${safariClip ? '-mt-6 pt-4' : ''}`}
      >
        <p className={`text-white/90 font-medium ${tiny}`}>Welcome to Acme Cloud</p>
        <h2 className={`text-white font-bold mt-1 ${large ? 'text-xl' : 'text-sm'}`}>
          Ship faster with your team
        </h2>
      </div>

      <div
        className={`mx-4 -mt-10 rounded-xl border shadow-lg p-5 space-y-4 ${
          dark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'
        } ${mobileFold ? (large ? 'pb-20 min-h-[380px]' : 'pb-16 min-h-[340px]') : ''} ${
          highlightIssueId === 'issue-1' || highlightIssueId === 'issue-7'
            ? 'ring-2 ring-red-500/60'
            : ''
        }`}
      >
        <p className={`${small} ${dark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Complete setup in under 2 minutes.
        </p>
        <ul className={`${tiny} space-y-1.5 ${dark ? 'text-zinc-500' : 'text-slate-500'}`}>
          <li>• Create your workspace</li>
          <li>• Invite teammates</li>
          <li>• Connect your first integration</li>
        </ul>
        {mobileFold && (
          <div className={`${tiny} text-slate-400 flex items-end ${large ? 'h-36' : 'h-32'}`}>
            Scroll required to reach primary CTA ↓
          </div>
        )}
        <div
          className={`space-y-3 ${safeAreaBug ? 'absolute bottom-3 left-4 right-4' : ''} ${
            mobileFold && !safeAreaBug ? (large ? 'mt-28' : 'mt-24') : ''
          }`}
        >
          <button
            type="button"
            data-forge-target="get-started"
            className={`w-full rounded-xl font-semibold ${btn} ${targetClass('get-started', activeTarget, large)} ${
              lowContrast ? 'bg-indigo-900 text-indigo-700' : 'bg-indigo-600 text-white'
            }`}
          >
            {nativeLabel(preview)}
          </button>
          <button
            type="button"
            data-forge-target="import-project"
            className={`w-full rounded-xl font-medium border ${btn} ${targetClass('import-project', activeTarget, large)} ${
              dark ? 'border-zinc-600 text-zinc-300' : 'border-slate-300 text-slate-700 bg-white'
            }`}
          >
            Import existing project
          </button>
        </div>
      </div>
    </div>
  );
}

function nativeLabel(preview: PreviewContext) {
  if (preview.mode === 'ios' || preview.mode === 'android') {
    if (preview.device === 'iPhone SE') return 'Continue';
    return 'Get started';
  }
  return 'Get started';
}

function WorkspaceScreen({
  preview,
  highlightIssueId,
  dark,
  text,
  tiny,
  btn,
  typedText,
  activeTarget,
}: {
  preview: PreviewContext;
  highlightIssueId: string | null;
  dark: boolean;
  text: string;
  tiny: string;
  btn: string;
  typedText: string;
  activeTarget?: string | null;
}) {
  const delayedSuccess = isIphone14Native(preview);
  const keyboardBug = isPixel7(preview);
  const showEdgeSkip = isEdgeDesktop(preview);

  return (
    <div className={`p-5 space-y-5 ${keyboardBug ? 'pt-3' : ''}`}>
      <h3 className={`font-semibold ${text}`}>Create workspace</h3>
      <div
        className={`space-y-2 ${
          highlightIssueId === 'issue-9' ? 'ring-2 ring-red-500/60 rounded-xl p-2' : ''
        }`}
      >
        <label className={`font-medium text-zinc-500 ${tiny}`}>Workspace name</label>
        <input
          type="text"
          data-forge-target="workspace-name"
          value={typedText}
          placeholder="acme-production"
          readOnly
          className={`w-full px-4 py-3.5 text-base rounded-xl border ${targetClass('workspace-name', activeTarget, true)} ${
            dark ? 'bg-zinc-800 border-zinc-600 text-zinc-100' : 'bg-white border-slate-300'
          }`}
        />
      </div>
      {delayedSuccess && typedText.length > 0 && (
        <p className={`${tiny} text-amber-600 italic`}>Waiting for confirmation…</p>
      )}
      <button
        type="button"
        data-forge-target="create-workspace"
        className={`w-full rounded-xl bg-indigo-600 text-white font-semibold ${btn} ${targetClass('create-workspace', activeTarget, true)}`}
      >
        Create workspace
      </button>
      {showEdgeSkip && (
        <button
          type="button"
          data-forge-target="skip-to-dashboard"
          className={`w-full rounded-xl border font-medium ${btn} ${targetClass('skip-to-dashboard', activeTarget, true)} ${
            dark ? 'border-zinc-600 text-zinc-400' : 'border-slate-300 text-slate-600'
          }`}
        >
          Skip to dashboard
        </button>
      )}
      {highlightIssueId === 'issue-8' && (
        <p className={`${tiny} text-amber-500`}>Success toast delayed 2.4s</p>
      )}
    </div>
  );
}

function InviteScreen({
  preview,
  highlightIssueId,
  dark,
  text,
  tiny,
  btn,
  typedText,
  activeTarget,
}: {
  preview: PreviewContext;
  highlightIssueId: string | null;
  dark: boolean;
  text: string;
  tiny: string;
  btn: string;
  typedText: string;
  activeTarget?: string | null;
}) {
  const focusBug = isFirefoxTablet(preview) && typedText === 'not-an-email';

  return (
    <div className="p-5 space-y-5">
      <h3 className={`font-semibold ${text}`}>Invite a teammate</h3>
      <div
        className={
          highlightIssueId === 'issue-3' ? 'ring-2 ring-amber-500/60 rounded-xl p-2' : ''
        }
      >
        <label className={`font-medium text-zinc-500 ${tiny}`}>Email</label>
        <input
          key={focusBug ? 'invalid' : 'valid'}
          type="email"
          data-forge-target="invite-email"
          value={typedText}
          readOnly
          className={`w-full mt-2 px-4 py-3 rounded-xl border text-base ${targetClass('invite-email', activeTarget, false)} ${
            focusBug ? 'border-amber-400' : dark ? 'border-zinc-600 bg-zinc-800' : 'border-slate-300'
          }`}
        />
        {focusBug && (
          <p className={`${tiny} text-amber-600 mt-2`}>Invalid email — focus lost</p>
        )}
      </div>
      <button
        type="button"
        data-forge-target="send-invite"
        className={`w-full rounded-xl bg-indigo-600 text-white font-semibold ${btn} ${targetClass('send-invite', activeTarget, false)}`}
      >
        Send invite
      </button>
    </div>
  );
}

function DashboardScreen({
  highlightIssueId,
  dark,
  text,
  small,
  activeTarget,
}: {
  highlightIssueId: string | null;
  dark: boolean;
  text: string;
  small: string;
  activeTarget?: string | null;
}) {
  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold ${text}`}>Dashboard</h3>
        <button
          type="button"
          data-forge-target="upgrade-btn"
          className={`px-4 py-2.5 rounded-lg bg-violet-100 text-violet-700 font-semibold ${small} ${targetClass('upgrade-btn', activeTarget, false)}`}
        >
          Upgrade
        </button>
      </div>
      <div
        className={`rounded-xl border border-dashed p-12 text-center ${
          dark ? 'border-zinc-700 bg-zinc-900/50' : 'border-slate-300 bg-slate-100/50'
        } ${highlightIssueId === 'issue-4' ? 'ring-2 ring-amber-500/50' : ''}`}
      >
        <p className={`${small} text-zinc-500`}>No data yet</p>
      </div>
    </div>
  );
}

function UpgradeScreen({
  preview,
  highlightIssueId,
  large,
  activeTarget,
}: {
  preview: PreviewContext;
  highlightIssueId: string | null;
  large: boolean;
  activeTarget?: string | null;
}) {
  const broken = isEdgeDesktop(preview);

  return (
    <div className="p-5 flex items-center justify-center min-h-full bg-black/20">
      <div
        className={`rounded-xl bg-white shadow-xl w-full max-w-[280px] ${
          broken ? 'px-3 py-4' : 'p-5'
        } ${large ? 'max-w-[320px]' : ''} ${
          highlightIssueId === 'issue-5' ? 'ring-2 ring-amber-500/60' : ''
        }`}
      >
        <h3 className={`font-semibold text-slate-900 ${large ? 'text-lg' : 'text-sm'}`}>
          Upgrade to Pro
        </h3>
        <p className={`text-slate-500 mt-2 ${large ? 'text-sm' : 'text-[10px]'}`}>
          Unlimited projects and SSO.
        </p>
        <div
          className={`mt-5 flex gap-2 ${broken ? 'flex-col items-start pl-1' : 'justify-end'}`}
        >
          <button type="button" className="text-slate-500 px-2 py-1 text-sm">
            Later
          </button>
          <button
            type="button"
            data-forge-target="upgrade-now"
            className={`font-semibold bg-indigo-600 text-white rounded-lg ${targetClass('upgrade-now', activeTarget, large)} ${
              broken ? 'px-8 py-2 ml-4 text-sm' : 'px-4 py-2 text-sm'
            }`}
          >
            Upgrade now
          </button>
        </div>
      </div>
    </div>
  );
}
