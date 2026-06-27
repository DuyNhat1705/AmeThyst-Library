import React from 'react';

export default function FilterCheckbox({ label, checked, onChange, count }) {
  return (
    <label className="flex items-center justify-between py-1.5 cursor-pointer group select-none">
      <div className="flex items-center gap-3">
        {/* Hidden Input */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        {/* Custom Visual Box */}
        <div
          className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
            checked
              ? 'bg-[#006F66] dark:bg-[#FFB95F] border-transparent'
              : 'border-neutral-300 dark:border-neutral-600 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 bg-white dark:bg-neutral-800'
          }`}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white dark:text-neutral-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        {/* Label */}
        <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
          {count}
        </span>
      )}
    </label>
  );
}
