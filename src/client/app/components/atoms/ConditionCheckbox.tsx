"use client";

interface ConditionCheckboxProps {
  id: string;
  label: string;
  fee: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ConditionCheckbox({ id, label, fee, checked, onChange }: ConditionCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between py-3 px-4 rounded-lg border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer transition-colors hover:bg-[#F8F3E9] dark:hover:bg-neutral-750"
    >
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-[#C4C6CD] dark:border-neutral-600 text-[#091426] dark:text-white focus:ring-[#091426] dark:focus:ring-white cursor-pointer"
        />
        <span className="text-[#1D1C16] dark:text-neutral-200 font-manrope text-sm font-medium">
          {label}
        </span>
      </div>
      <span className="text-[#74777D] dark:text-neutral-400 font-manrope text-sm">
        {fee === 0 ? '$0.00' : `+$${fee.toFixed(2)}`}
      </span>
    </label>
  );
}
