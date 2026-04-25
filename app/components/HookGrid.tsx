"use client";

import { useState } from "react";
import type { Category, Hook } from "@/app/lib/hooks-data";
import { CategoryFilter } from "./CategoryFilter";
import { HookCard } from "./HookCard";

type Props = {
  hooks: Hook[];
  categories: Category[];
};

export function HookGrid({ hooks, categories }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const visible = active ? hooks.filter((h) => h.category === active) : hooks;

  return (
    <div className="flex flex-col gap-8">
      <CategoryFilter
        categories={categories}
        active={active}
        onChange={setActive}
      />

      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((hook) => (
            <li key={hook.id}>
              <HookCard hook={hook} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-20 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
        No hooks found for this category yet.
      </p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Try another category or check back soon.
      </p>
    </div>
  );
}
