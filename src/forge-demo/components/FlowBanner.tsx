interface Props {
  flowName: string | null;
  flowStep: string | null;
  actionLabel: string | null;
}

export function FlowBanner({ flowName, flowStep, actionLabel }: Props) {
  if (!flowName) return null;

  return (
    <div className="absolute top-2 left-2 right-2 z-30 flex items-center gap-2 pointer-events-none">
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-950/90 border border-violet-500/30 backdrop-blur-sm shadow-lg text-[11px]">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-violet-300 font-medium">{flowName}</span>
        {flowStep && <span className="text-zinc-500">· Step {flowStep}</span>}
        {actionLabel && (
          <>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{actionLabel}</span>
          </>
        )}
      </div>
    </div>
  );
}
