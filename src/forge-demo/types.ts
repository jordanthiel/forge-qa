export type MatrixStatus = 'pending' | 'running' | 'passed' | 'warning' | 'failed';

export type DemoSpeed = 'normal' | 'fast' | 'instant';

export type PreviewMode = 'web' | 'ios' | 'android';

export type AppScreen =
  | 'welcome'
  | 'workspace'
  | 'invite'
  | 'dashboard'
  | 'upgrade';

export type DemoPhase = 'idle' | 'running' | 'complete';

export interface PreviewContext {
  mode: PreviewMode;
  browser?: string;
  viewport?: string;
  device?: string;
}

export type FlowActionType = 'click' | 'type' | 'navigate' | 'observe';

export interface DemoStep {
  id: string;
  label: string;
  durationMs: number;
  log: string;
  preview?: PreviewContext;
  screen?: AppScreen;
  matrixIds?: string[];
  matrixStatus?: MatrixStatus;
  /** User flow being exercised, e.g. "Onboarding" */
  flowName?: string;
  /** Step within flow, e.g. "3/6" */
  flowStep?: string;
  /** data-forge-target id for click/type highlight */
  actionTarget?: string;
  action?: FlowActionType;
  /** Simulated typing in inputs */
  typedText?: string;
}

export interface TestMatrixItem {
  id: string;
  platform: 'Web' | 'iOS' | 'Android';
  label: string;
  sublabel: string;
  finalStatus: MatrixStatus;
  issueId?: string;
}

export type IssueSeverity = 'high' | 'medium' | 'low';

export interface ForgeIssue {
  id: string;
  severity: IssueSeverity;
  platform: string;
  browserDevice: string;
  title: string;
  why: string;
  repro: string[];
  fix: string;
  screen: AppScreen;
}
