import type { Hook } from "@/app/lib/hooks-data";

const CATEGORY_STYLES: Record<string, string> = {
  security:
    "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
  "file-management":
    "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  git: "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300",
  testing:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  notifications:
    "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300",
  session:
    "bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300",
  permissions:
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/60 dark:text-fuchsia-300",
  utilities:
    "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300",
};

export function HookCard({ hook }: { hook: Hook }) {
  const badgeClass = CATEGORY_STYLES[hook.category] ?? CATEGORY_STYLES.utilities;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {hook.name}
        </h2>
        <span
          className={
            "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
            badgeClass
          }
        >
          {hook.category}
        </span>
      </div>

      <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>

      <a
        href={hook.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-700 dark:hover:decoration-zinc-100"
      >
        Open repo
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
