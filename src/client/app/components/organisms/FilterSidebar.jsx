import React from 'react';
import FilterCheckbox from '../atoms/FilterCheckbox';
import RangeInput from '../atoms/RangeInput';

const AVAILABLE_GENRES = [
  'Fiction',
  'Nonfiction',
  'Mathematics',
  'Physics',
  'Biology',
  'Computer Science',
  'Philosophy',
  'Psychology',
  'Literature'
];

const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'fr', name: 'French' },
  { code: 'ja', name: 'Japanese' }
];

export default function FilterSidebar({ filters, onChange, onClear, isMobileOpen, onCloseMobile }) {
  const handleGenreChange = (genre, checked) => {
    const currentGenres = filters.genres || [];
    const newGenres = checked
      ? [...currentGenres, genre]
      : currentGenres.filter(g => g !== genre);
    onChange({ ...filters, genres: newGenres });
  };

  const handleLanguageChange = (langCode, checked) => {
    const currentLangs = filters.languages || [];
    const newLangs = checked
      ? [...currentLangs, langCode]
      : currentLangs.filter(l => l !== langCode);
    onChange({ ...filters, languages: newLangs });
  };

  const handleDateChange = (type, val) => {
    const dateRange = filters.publicationDate || { start: '', end: '' };
    onChange({
      ...filters,
      publicationDate: {
        ...dateRange,
        [type]: val
      }
    });
  };

  const activeFiltersCount = 
    (filters.genres?.length || 0) + 
    (filters.languages?.length || 0) + 
    ((filters.publicationDate?.start || filters.publicationDate?.end) ? 1 : 0);

  const sidebarContent = (
    <div className="flex flex-col gap-7 h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-[#006F66]/10 dark:bg-[#FFB95F]/10 text-[#006F66] dark:text-[#FFB95F] text-xs rounded-full font-bold">
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-bold text-[#006F66] dark:text-[#FFB95F] hover:underline cursor-pointer transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable body */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-7">
        {/* Genres */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide text-[11px]">
            Genres
          </span>
          <div className="flex flex-col gap-1">
            {AVAILABLE_GENRES.map(genre => (
              <FilterCheckbox
                key={genre}
                label={genre}
                checked={(filters.genres || []).includes(genre)}
                onChange={(checked) => handleGenreChange(genre, checked)}
              />
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide text-[11px]">
            Languages
          </span>
          <div className="flex flex-col gap-1">
            {AVAILABLE_LANGUAGES.map(lang => (
              <FilterCheckbox
                key={lang.code}
                label={lang.name}
                checked={(filters.languages || []).includes(lang.code)}
                onChange={(checked) => handleLanguageChange(lang.code, checked)}
              />
            ))}
          </div>
        </div>

        {/* Publication Year Range */}
        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-5">
          <RangeInput
            label="Publication Year"
            min={1500}
            max={2026}
            minValue={filters.publicationDate?.start ?? ''}
            maxValue={filters.publicationDate?.end ?? ''}
            onChangeMin={(val) => handleDateChange('start', val)}
            onChangeMax={(val) => handleDateChange('end', val)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky left column) */}
      <aside className="hidden lg:block w-64 shrink-0 h-fit sticky top-24 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800/80 p-5 rounded-2xl shadow-sm">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-80 bg-white dark:bg-neutral-850 border-r border-neutral-200 dark:border-neutral-800 p-6 z-50 shadow-2xl transition-transform duration-300 ease-out transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={onCloseMobile}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
            aria-label="Close filters"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-[calc(100%-40px)]">
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
