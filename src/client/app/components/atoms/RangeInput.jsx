import React from 'react';

export default function RangeInput({ label, min, max, minValue, maxValue, onChangeMin, onChangeMax, unit = '' }) {
  const handleMinChange = (e) => {
    const val = e.target.value === '' ? '' : parseInt(e.target.value);
    onChangeMin(val);
  };

  const handleMaxChange = (e) => {
    const val = e.target.value === '' ? '' : parseInt(e.target.value);
    onChangeMax(val);
  };

  const isInvalid = minValue !== '' && maxValue !== '' && minValue > maxValue;

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {/* Min Input */}
        <div className="flex-1 relative">
          <input
            type="number"
            min={min}
            max={max}
            value={minValue ?? ''}
            onChange={handleMinChange}
            placeholder="Min"
            className={`w-full px-3 py-2 bg-white dark:bg-neutral-800 border text-sm text-neutral-800 dark:text-neutral-100 rounded-lg outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              isInvalid
                ? 'border-red-500 focus:border-red-500'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-[#006F66] dark:focus:border-[#FFB95F]'
            }`}
          />
          {unit && (
            <span className="absolute right-3 top-2 text-xs text-neutral-400">
              {unit}
            </span>
          )}
        </div>
        
        <span className="text-neutral-400 font-medium">to</span>

        {/* Max Input */}
        <div className="flex-1 relative">
          <input
            type="number"
            min={min}
            max={max}
            value={maxValue ?? ''}
            onChange={handleMaxChange}
            placeholder="Max"
            className={`w-full px-3 py-2 bg-white dark:bg-neutral-800 border text-sm text-neutral-800 dark:text-neutral-100 rounded-lg outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              isInvalid
                ? 'border-red-500 focus:border-red-500'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-[#006F66] dark:focus:border-[#FFB95F]'
            }`}
          />
          {unit && (
            <span className="absolute right-3 top-2 text-xs text-neutral-400">
              {unit}
            </span>
          )}
        </div>
      </div>
      {isInvalid && (
        <span className="text-xs text-red-500">
          Minimum value cannot exceed maximum.
        </span>
      )}
    </div>
  );
}
