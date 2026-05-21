import type { ForgeIssue } from '../types';

export function buildClaudePrompt(issue: ForgeIssue): string {
  return `Fix this Forge QA issue from the PR preview deployment.

**${issue.title}**
Severity: ${issue.severity} · Environment: ${issue.browserDevice}

**Why it matters**
${issue.why}

**Repro steps**
${issue.repro.map((s, i) => `${i + 1}. ${s}`).join('\n')}

**Suggested fix**
${issue.fix}

Likely files: OnboardingModal.tsx, WorkspaceSetup.tsx, DashboardEmptyState.tsx, UpgradeModal.tsx, App.native.tsx`;
}

export function buildJiraPayload(issue: ForgeIssue): string {
  return `h2. ${issue.title}

*Severity:* ${issue.severity}
*Platform:* ${issue.platform}
*Environment:* ${issue.browserDevice}
*Found by:* Forge Product QA (PR preview)

h3. Description
${issue.why}

h3. Steps to reproduce
${issue.repro.map((s) => `# ${s}`).join('\n')}

h3. Suggested fix
${issue.fix}

----
_Auto-generated from Forge QA review._`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
