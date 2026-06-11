"use client";

import React from 'react';
import Link from 'next/link';
import { FormField } from '../components/molecules';
import { Button } from '../components/atoms';
import { OAuthButtons } from '../components/molecules';

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
        <FormField
          label="Email Address"
          id="email"
          type="email"
          placeholder="e.g. researcher@university.edu"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          error={validationErrors.email}
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-semibold tracking-[0.01em]">Password</label>
            <Link href="/forgot-password" className="text-[#006A61] text-xs font-medium tracking-[0.02em] hover:underline">Forgot Password?</Link>
          </div>
          <FormField
            id="password"
            type="password"
            label=""
            placeholder="••••••••"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            error={validationErrors.password}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-[52px]"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-[#C5C6CD]"></div>
          <span className="text-[#45474C] text-xs font-medium tracking-[0.02em]">OR</span>
          <div className="flex-1 h-px bg-[#C5C6CD]"></div>
        </div>

        <OAuthButtons />

        <div className="flex flex-col items-center gap-4 mt-2">
          <p className="text-[#45474C] text-sm tracking-[-0.01em]">Don’t have an account? Create!</p>
          <Link href="/register" className="w-full h-[52px]">
            <Button variant="primary" className="w-full h-[52px]">
              Create Account
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormCard;
