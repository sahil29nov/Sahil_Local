import { HookGrid } from "./components/HookGrid";
import { getAvailableCategories, getHooks } from "./lib/hooks-data";

export default function Home() {
  const hooks = getHooks();
  const categories = getAvailableCategories();

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8 lg:py-24">
        <header className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            HookHub
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A curated, browsable hub of open-source Claude hooks. Discover
            high-signal hooks and jump straight to the repo.
          </p>
        </header>

        <HookGrid hooks={hooks} categories={categories} />
      </main>
    </div>
  );
}
