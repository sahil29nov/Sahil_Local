"use client";

import type { Category } from "@/app/lib/hooks-data";

type Props = {
  categories: Category[];
  active: string | null;
  onChange: (category: string | null) => void;
};

export function CategoryFilter({ categories, active, onChange }: Props) {
  const chips: { label: string; value: string | null }[] = [
    { label: "All", value: null },
    ...categories.map((c) => ({ label: c, value: c })),
  ];

  return (
    <nav
      aria-label="Filter hooks by category"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {chips.map((chip) => {
        const isActive = chip.value === active;
        return (
          <button
            key={chip.label}
            type="button"
            onClick={() => onChange(chip.value)}
            aria-pressed={isActive}
            className={
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors " +
              (isActive
                ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900")
            }
          >
            {chip.label}
          </button>
        );
      })}
    </nav>
  );
}
