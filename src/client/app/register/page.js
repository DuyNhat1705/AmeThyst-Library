"use client";

import React, { useState } from 'react';
import RegisterFormCard from './RegisterFormCard';
import loginPanelImg from '../assets/login_panel.png';

const RegisterPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    validationErrors: {},
    isSuccess: false,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student",
    password: "",
  });

  return (
    // min-h-screen với nền cũ #FFF8EB, sử dụng flex để căn giữa hoàn toàn theo cả 2 chiều
      <main 
        className="min-h-screen flex items-center justify-center font-inter text-[#091426] overflow-x-hidden relative p-4 lg:p-8 bg-cover bg-center bg-no-repeat"
        style={{ 
          // Sử dụng .src từ file ảnh đã import giống hệt cách làm của BrandPanel
          backgroundImage: `url('${loginPanelImg.src}')` 
        }}
      >     
      {/* Lớp phủ làm giảm độ sáng của background cũ (giảm khoảng 10%) */}
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

      {/* Vùng chứa Form Area - Căn giữa tuyệt đối trên màn hình và nằm trên lớp giảm sáng */}
      <section className="w-full flex justify-center items-center relative z-10">
        {/* Giữ nguyên màu nền gốc của card để tương phản với nền đã giảm độ sáng ở phía sau */}
        <div className="bg-[#FFF8EB] p-8 lg:p-12 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15),-9px_4px_76px_0_rgba(0,0,0,0.2)] w-full max-w-[480px] flex justify-center items-center">
          <RegisterFormCard 
            formData={formData}
            setFormData={setFormData}
            state={state}
            setState={setState}
          />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;