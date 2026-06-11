import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full h-[52px] px-4 rounded-lg border border-[#C5C6CD] bg-[#F8F9FF] text-base focus:outline-none focus:ring-1 focus:ring-[#006A61] transition-all ${className}`}
      {...props}
    />
  );
};
