import React from 'react';

export default function EmptySearchResults({ query, activeFiltersCount, onClearFilters, onToggleSemantic }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-neutral-50 dark:bg-neutral-900/40 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-xl mx-auto my-8">
      {/* Icon */}
      <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 dark:text-neutral-500 mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      {/* Headings */}
      <h3 className="text-xl font-bold text-neutral-850 dark:text-neutral-100 mb-3">
        No books found
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-8 leading-relaxed">
        {query ? (
          <>We couldn't find any results for <span className="font-semibold text-neutral-700 dark:text-neutral-350">"{query}"</span>.</>
        ) : (
          "No books match the chosen parameters."
        )}
      </p>

      {/* Tips / Suggestions */}
      <div className="w-full text-left bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl p-5 mb-8 shadow-sm">
        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
          Suggestions
        </span>
        <ul className="space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
          <li className="flex items-start gap-2.5">
            <span className="text-[#006F66] dark:text-[#FFB95F] mt-0.5">•</span>
            <span>Check the spelling of your keywords.</span>
          </li>
          {activeFiltersCount > 0 && (
            <li className="flex items-start gap-2.5">
              <span className="text-[#006F66] dark:text-[#FFB95F] mt-0.5">•</span>
              <span>
                Try removing some filters. You currently have{' '}
                <span className="font-semibold">{activeFiltersCount} active filters</span>.
              </span>
            </li>
          )}
          <li className="flex items-start gap-2.5">
            <span className="text-[#006F66] dark:text-[#FFB95F] mt-0.5">•</span>
            <span>Try entering a natural language plot description and toggle to Semantic Search.</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="px-5 py-2.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-250 text-sm font-semibold rounded-xl transition cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
        <button
          type="button"
          onClick={onToggleSemantic}
          className="px-5 py-2.5 bg-[#006F66] dark:bg-[#FFB95F] text-white dark:text-neutral-900 text-sm font-semibold rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
        >
          Try Semantic Search
        </button>
      </div>
    </div>
  );
}
