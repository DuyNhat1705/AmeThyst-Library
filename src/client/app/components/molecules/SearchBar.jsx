import React from 'react';

export default function SearchBar({ value, onChange, onSearch, placeholder = "Search for books..." }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full flex gap-3 max-w-3xl">
      <div className="relative flex-grow shadow-sm">
        {/* Search Icon */}
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        
        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="block w-full pl-11 pr-10 py-3.5 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-2xl outline-none focus:ring-2 focus:ring-[#006F66]/30 focus:border-[#006F66] dark:focus:ring-[#FFB95F]/20 dark:focus:border-[#FFB95F] transition-all text-base"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onSearch}
        className="px-6 py-3.5 bg-[#006F66] dark:bg-[#FFB95F] text-white dark:text-neutral-900 font-bold rounded-2xl shadow-md hover:shadow-lg hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
      >
        <span>Search</span>
      </button>
    </div>
  );
}
