import { useState, useEffect } from 'react';

type ComponentName = 'overview' | 'getting-started';

export function App() {
  const [activeComponent, setActiveComponent] =
    useState<ComponentName>('overview');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="px-8 py-6 text-center">
          <h1 className="text-4xl font-bold text-slate-950 dark:text-slate-50 mb-2">
            Component Library
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Develop and document your React components
          </p>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <nav className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 py-6 flex flex-col gap-1">
          <button
            className={`px-6 py-3 text-left transition-all text-sm font-medium ${
              activeComponent === 'overview'
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-slate-900 border-l-3 border-primary-600 dark:border-primary-400 pl-3'
                : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
            onClick={() => setActiveComponent('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 text-left transition-all text-sm font-medium ${
              activeComponent === 'getting-started'
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-slate-900 border-l-3 border-primary-600 dark:border-primary-400 pl-3'
                : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
            onClick={() => setActiveComponent('getting-started')}
          >
            Getting Started
          </button>

          <div className="border-t border-slate-200 dark:border-slate-800 mt-4 pt-4 px-6">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </nav>

        <main className="flex-1 p-8 overflow-y-auto">
          {activeComponent === 'overview' && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50 mb-4">
                Welcome
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                This is your component library documentation site.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Add your components here and develop them in real-time with HMR.
              </p>
            </section>
          )}

          {activeComponent === 'getting-started' && (
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50 mb-4">
                Getting Started
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-slate-600 dark:text-slate-400">
                <li>
                  Create component files in{' '}
                  <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-600 dark:text-primary-400">
                    src/lib/
                  </code>
                </li>
                <li>
                  Export them from{' '}
                  <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-600 dark:text-primary-400">
                    src/lib/index.ts
                  </code>
                </li>
                <li>Add showcase pages in this app</li>
                <li>
                  Run{' '}
                  <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary-600 dark:text-primary-400">
                    npm run build
                  </code>{' '}
                  to generate the library
                </li>
              </ol>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
