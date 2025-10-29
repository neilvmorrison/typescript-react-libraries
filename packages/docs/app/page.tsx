import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
      <h1 className="text-3xl font-semibold mb-3">Naked UI</h1>
      <h2 className="text-lg max-w-1/3 text-center mb-8">
        A collection of TypeScript utilities, React hooks, and UI primitives
        designed to minimize boilerplate.
      </h2>
      <div className="flex items-center justify-center gap-4">
        <Link href="/hooks" className="text-blue-500 hover:text-blue-600">
          React Hooks
        </Link>
        <Link href="/utilities" className="text-slate-700 hover:text-slate-800">
          TypeScript Utilities
        </Link>
        <Link
          href="/components"
          className="text-indigo-700 hover:text-indigo-800"
        >
          React Components
        </Link>
      </div>
    </div>
  );
}
