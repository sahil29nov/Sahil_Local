export const CATEGORIES = [
  "security",
  "file-management",
  "git",
  "testing",
  "notifications",
  "session",
  "permissions",
  "utilities",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Hook = {
  id: string;
  name: string;
  category: Category;
  description: string;
  repoUrl: string;
  createdAt: string;
};

export const HOOKS: Hook[] = [
  {
    id: "1",
    name: "secret-scanner",
    category: "security",
    description:
      "Pre-commit hook that blocks commits containing API keys, tokens, or other credentials.",
    repoUrl: "https://github.com/example/secret-scanner",
    createdAt: "2026-04-20T10:00:00Z",
  },
  {
    id: "2",
    name: "auto-format",
    category: "file-management",
    description:
      "Automatically formats files with Prettier on write, respecting project config.",
    repoUrl: "https://github.com/example/auto-format",
    createdAt: "2026-04-18T09:30:00Z",
  },
  {
    id: "3",
    name: "branch-guard",
    category: "git",
    description:
      "Prevents direct pushes to protected branches and enforces conventional commit messages.",
    repoUrl: "https://github.com/example/branch-guard",
    createdAt: "2026-04-15T14:15:00Z",
  },
  {
    id: "4",
    name: "test-runner",
    category: "testing",
    description:
      "Runs the affected test suite after each edit and surfaces failures inline.",
    repoUrl: "https://github.com/example/test-runner",
    createdAt: "2026-04-12T11:00:00Z",
  },
  {
    id: "5",
    name: "desktop-notify",
    category: "notifications",
    description:
      "Sends a native desktop notification when long-running tasks finish or fail.",
    repoUrl: "https://github.com/example/desktop-notify",
    createdAt: "2026-04-10T08:45:00Z",
  },
  {
    id: "6",
    name: "session-logger",
    category: "session",
    description:
      "Appends prompts and tool calls to a local JSONL log for later review and audit.",
    repoUrl: "https://github.com/example/session-logger",
    createdAt: "2026-04-08T16:20:00Z",
  },
  {
    id: "7",
    name: "cmd-allowlist",
    category: "permissions",
    description:
      "Restricts Bash execution to a project-defined allowlist and blocks destructive patterns.",
    repoUrl: "https://github.com/example/cmd-allowlist",
    createdAt: "2026-04-05T13:05:00Z",
  },
  {
    id: "8",
    name: "statusline-git",
    category: "utilities",
    description:
      "Custom status line showing current branch, dirty state, and token usage at a glance.",
    repoUrl: "https://github.com/example/statusline-git",
    createdAt: "2026-04-02T12:00:00Z",
  },
  {
    id: "9",
    name: "pii-redactor",
    category: "security",
    description:
      "Redacts emails, phone numbers, and other PII from tool outputs before they reach the model.",
    repoUrl: "https://github.com/example/pii-redactor",
    createdAt: "2026-03-30T09:00:00Z",
  },
  {
    id: "10",
    name: "snapshot-files",
    category: "file-management",
    description:
      "Snapshots the workspace before risky edits so changes can be rolled back in one command.",
    repoUrl: "https://github.com/example/snapshot-files",
    createdAt: "2026-03-27T15:40:00Z",
  },
  {
    id: "11",
    name: "pr-preview",
    category: "git",
    description:
      "Generates a PR description from the diff and opens it for review before pushing.",
    repoUrl: "https://github.com/example/pr-preview",
    createdAt: "2026-03-24T10:30:00Z",
  },
  {
    id: "12",
    name: "slack-notify",
    category: "notifications",
    description:
      "Posts a message to a Slack channel when a session ends or an agent needs input.",
    repoUrl: "https://github.com/example/slack-notify",
    createdAt: "2026-03-20T11:15:00Z",
  },
];

export function getHooks(category?: string): Hook[] {
  const sorted = [...HOOKS].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  if (!category) return sorted;
  return sorted.filter((h) => h.category === category);
}

export function getAvailableCategories(): Category[] {
  const present = new Set(HOOKS.map((h) => h.category));
  return CATEGORIES.filter((c) => present.has(c));
}
