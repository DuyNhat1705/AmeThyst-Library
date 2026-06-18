"use client";

import React, { useState } from 'react';
import { NavBar, Footer } from '../organisms';
import FormCard from '../../login/FormCard';

interface LoginTemplateProps {
  leftPanel: React.ReactNode;
}

export default function LoginTemplate({ leftPanel }: LoginTemplateProps) {
  const [state, setState] = useState({
    isLoading: false,
    error: null as string | null,
    validationErrors: {},
    isSuccess: false,
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setState(prev => ({ ...prev, isLoading: false, isSuccess: true }));

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/library';
      }, 500);
    } catch (err: any) {
      console.error('Login error:', err);
      setState(prev => ({ ...prev, isLoading: false, error: err.message }));
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8EB] flex flex-col font-inter text-[#091426] overflow-x-hidden relative">
      <NavBar />
      
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

      <div className="flex flex-col lg:flex-row flex-grow">
        {leftPanel}

        {/* Right Panel (Form Area) */}
        <section className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 min-h-screen">
          <FormCard 
            credentials={credentials}
            setCredentials={setCredentials}
            isLoading={state.isLoading}
            validationErrors={state.validationErrors}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
      <Footer />
    </main>
  );
}
