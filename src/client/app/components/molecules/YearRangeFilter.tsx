import React from 'react';

interface YearRangeFilterProps {
  startYear: string;
  endYear: string;
  onStartYearChange: (val: string) => void;
  onEndYearChange: (val: string) => void;
}

export default function YearRangeFilter({
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange
}: YearRangeFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-[#091426] font-inter">Publication Year</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min Year"
          value={startYear}
          onChange={(e) => onStartYearChange(e.target.value)}
          className="w-full px-3 py-2 border border-[#C5C6CD] rounded-xl font-inter text-sm text-navy bg-white focus:outline-none focus:border-[#006F66]"
          min="0"
          max="2100"
        />
        <span className="text-gray-400 font-inter text-sm">—</span>
        <input
          type="number"
          placeholder="Max Year"
          value={endYear}
          onChange={(e) => onEndYearChange(e.target.value)}
          className="w-full px-3 py-2 border border-[#C5C6CD] rounded-xl font-inter text-sm text-navy bg-white focus:outline-none focus:border-[#006F66]"
          min="0"
          max="2100"
        />
      </div>
    </div>
  );
}
