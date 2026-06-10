"use client";

import React from 'react';

const InputField = ({ label, id, type, placeholder, value, onChange, error, icon }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-sm font-semibold tracking-[0.01em]">
          {label}
        </label>
        {type === 'password' && (
          <a href="/forgot-password" title="Forgot Password" className="text-[#006A61] text-xs font-medium tracking-[0.02em] hover:underline">
            Forgot Password?
          </a>
        )}
      </div>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full h-[52px] ${icon ? 'pl-11' : 'px-4'} rounded-lg border ${
            error ? 'border-red-500' : 'border-[#C5C6CD]'
          } bg-[#F8F9FF] text-base focus:outline-none focus:ring-1 focus:ring-[#006A61] transition-all`}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <span className="text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
};

export default InputField;
