"use client";

import React from 'react';
import Link from 'next/link';
import InputField from './InputField';
import OAuthButtons from '../components/OAuthButtons';

const FormCard = ({ 
  credentials, 
  setCredentials, 
  isLoading, 
  validationErrors 
}) => {
  return (
    <div className="w-full max-w-[342px] flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-[-0.01em]">Sign In</h2>
      </header>

      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <InputField
          label="Email Address"
          id="email"
          type="email"
          placeholder="e.g. researcher@university.edu"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          error={validationErrors.email}
        />

        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          error={validationErrors.password}
        />

        <button
          type="submit"
          className="w-full h-[52px] rounded-lg bg-[#091426] text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-[#C5C6CD]"></div>
          <span className="text-[#45474C] text-xs font-medium tracking-[0.02em]">OR</span>
          <div className="flex-1 h-px bg-[#C5C6CD]"></div>
        </div>

        <OAuthButtons />

        <div className="flex flex-col items-center gap-4 mt-2">
          <p className="text-[#45474C] text-sm tracking-[-0.01em]">Don’t have an account? Create!</p>
          <Link href="/register" className="w-full h-[52px] rounded-lg bg-[#091426] text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormCard;
