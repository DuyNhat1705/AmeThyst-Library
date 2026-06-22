"use client";

import React from 'react';

export interface SecurityIndicatorProps {
  level: number;
}

export function SecurityIndicator({ level }: SecurityIndicatorProps) {
  return (
    <div className="flex pt-2 flex-col items-start -space-y-px w-full gap-2">
      <div className="flex justify-center items-start gap-1 w-full h-1">
        {[1, 2, 3, 4].map((bar) => (
          <div 
            key={bar}
            className={`rounded-full w-full h-full transition-colors duration-300 ${
              bar <= level ? 'bg-[#091426]' : 'bg-[#D3E4FE]'
            }`}
          />
        ))}
      </div>
      <p className="text-[#45474C] font-inter text-xs font-medium leading-4 w-fit tracking-[0.02em]">
        Security Level
      </p>
    </div>
  );
}

export default SecurityIndicator;
