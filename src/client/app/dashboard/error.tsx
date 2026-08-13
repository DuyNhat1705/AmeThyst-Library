'use client';

import { useEffect } from 'react';

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Dashboard rendering failed:', error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center p-6">
      <section className="max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Unable to load this dashboard</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">The page encountered an unexpected error. Your data has not been changed.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E293B] dark:bg-neutral-100 dark:text-neutral-900"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
