"use client";

import React from 'react';

const RoleSelector = ({ selectedRole, onChange }) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#0B1C30] font-inter text-sm font-semibold leading-5 w-full tracking-[0.01em]">
          Your Role
        </p>
      </div>
      <div 
        className="inline-grid grid-cols-2 p-1 rounded-lg border border-[#C5C6CD] bg-[#EFF4FF] w-full relative h-[42px]"
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedRole === 'student'}
          onClick={() => onChange('student')}
          className={`cursor-pointer text-nowrap flex justify-center items-center rounded transition-all duration-200 h-full ${
            selectedRole === 'student' 
              ? 'bg-[#091426] text-white shadow-sm' 
              : 'text-[#45474C] hover:bg-[#D3E4FE]'
          }`}
        >
          <span className="font-inter text-sm font-semibold leading-5 tracking-[0.01em]">
            Student/General
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={selectedRole === 'librarian'}
          onClick={() => onChange('librarian')}
          className={`cursor-pointer text-nowrap flex justify-center items-center rounded transition-all duration-200 h-full ${
            selectedRole === 'librarian' 
              ? 'bg-[#091426] text-white shadow-sm' 
              : 'text-[#45474C] hover:bg-[#D3E4FE]'
          }`}
        >
          <span className="font-inter text-sm font-semibold leading-5 tracking-[0.01em]">
            Librarian
          </span>
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
