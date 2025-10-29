import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white dark:from-black dark:to-zinc-950">
      <div className="flex-1">
        <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 text-center">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-black dark:text-white md:text-6xl">
              @libraries
            </h1>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
              A comprehensive collection of production-ready React hooks,
              TypeScript utilities, and UI components.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/hooks"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Explore Hooks
              </Link>
              <Link
                href="/utilities"
                className="rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-zinc-900"
              >
                View Utilities
              </Link>
              <Link
                href="/components"
                className="rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-zinc-900"
              >
                Browse Components
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-black dark:text-white">
              What&apos;s Included
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Link
                href="/hooks"
                className="group rounded-lg border-2 border-zinc-200 bg-white p-8 transition hover:border-blue-600 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-400"
              >
                <div className="mb-4 text-3xl">🪝</div>
                <h3 className="mb-2 text-xl font-semibold text-black group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  React Hooks
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  7 production-ready hooks for forms, storage, events, and more.
                </p>
              </Link>
              <Link
                href="/utilities"
                className="group rounded-lg border-2 border-zinc-200 bg-white p-8 transition hover:border-blue-600 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-400"
              >
                <div className="mb-4 text-3xl">⚙️</div>
                <h3 className="mb-2 text-xl font-semibold text-black group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  Utilities
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Essential TypeScript utilities for data formatting and API
                  calls.
                </p>
              </Link>
              <Link
                href="/components"
                className="group rounded-lg border-2 border-zinc-200 bg-white p-8 transition hover:border-blue-600 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-400"
              >
                <div className="mb-4 text-3xl">🧩</div>
                <h3 className="mb-2 text-xl font-semibold text-black group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  Components
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Accessible and composable React UI components.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-zinc-50 px-4 py-20 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-black dark:text-white">
              Getting Started
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                Install the packages you need from npm and start building with
                production-ready utilities.
              </p>
              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-white dark:bg-zinc-800">
                <code>
                  npm install @libraries/hooks @libraries/utilities
                  @libraries/components
                </code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
