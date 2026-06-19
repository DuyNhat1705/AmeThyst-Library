"use client";

import React, { useState } from 'react';
import { NavBar, Footer } from '../organisms';
import RegisterFormCard from '../../register/RegisterFormCard';
import loginPanelImg from '../../assets/login_panel.png';

interface RegisterTemplateProps {
    children: React.ReactNode;
}

export default function RegisterTemplate({ children }: RegisterTemplateProps) {
  const [state, setState] = useState({
    isLoading: false,
    error: null as string | null,
    validationErrors: {},
    isSuccess: false,
  });

  return (
    <main 
      className="min-h-screen flex flex-col font-inter text-[#091426] overflow-x-hidden relative bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url('${loginPanelImg.src}')` 
      }}
    >     
      <NavBar />
      {/* Lớp phủ làm giảm độ sáng của background cũ */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

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

      {/* Vùng chứa Form Area */}
      <section className="flex-grow w-full flex justify-center items-center relative z-10 p-4 lg:p-8">
        <div className="bg-[#FFF8EB] p-8 lg:p-12 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15),-9px_4px_76px_0_rgba(0,0,0,0.2)] w-full max-w-[480px] flex justify-center items-center">
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
}
