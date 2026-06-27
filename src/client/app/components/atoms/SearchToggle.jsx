import React from 'react';

export default function SearchToggle({ value, onChange }) {
  return (
    <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-2xl w-fit shadow-inner border border-neutral-200 dark:border-neutral-700 transition-colors">
      <button
        type="button"
        onClick={() => onChange('standard')}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          value === 'standard'
            ? 'bg-white dark:bg-neutral-700 text-[#006F66] dark:text-[#FFB95F] shadow-sm'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
        }`}
      >
        Standard Search
      </button>
      <button
        type="button"
        onClick={() => onChange('semantic')}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          value === 'semantic'
            ? 'bg-white dark:bg-neutral-700 text-[#006F66] dark:text-[#FFB95F] shadow-sm'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
        }`}
      >
        Semantic Search
      </button>
    </div>
  );
}
