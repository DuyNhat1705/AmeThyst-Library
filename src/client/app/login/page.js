"use client";

import React, { useState } from 'react';
import BrandPanel from './BrandPanel';
import FormCard from './FormCard';
import StateMockConsole from './StateMockConsole';

const LoginPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    validationErrors: {},
    isSuccess: false,
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <main className="min-h-screen bg-[#FFF8EB] flex flex-col lg:flex-row font-inter text-[#091426] overflow-x-hidden relative">
      {/* Top-level Error Banner */}
      {state.error && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center z-[100] animate-in fade-in slide-in-from-top duration-300">
          <p className="font-semibold">{state.error}</p>
          <button 
            onClick={() => setState(prev => ({ ...prev, error: null }))}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Mock Controls */}
      <StateMockConsole state={state} setState={setState} />

      {/* Left Panel (Branding Illustration) */}
      <BrandPanel />

      {/* Right Panel (Form Area) */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 min-h-screen">
        <FormCard 
          credentials={credentials}
          setCredentials={setCredentials}
          isLoading={state.isLoading}
          validationErrors={state.validationErrors}
        />
      </section>
    </main>
  );
};

export default LoginPage;
