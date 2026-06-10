"use client";

import React, { useState } from "react";

interface LoginFormState {
  isLoading: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  isSuccess: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [state, setState] = useState<LoginFormState>({
    isLoading: false,
    error: null,
    validationErrors: {},
    isSuccess: false,
  });

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen bg-[#FFF8EB] flex items-center justify-center font-inter text-[#091426] overflow-x-hidden relative">
      {/* Top-level Error Banner */}
      {state.error && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center z-[100] animate-in fade-in slide-in-from-top duration-300">
          <p className="font-semibold">{state.error}</p>
          <button 
            onClick={() => setState({ ...state, error: null })}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Mock Controls */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-[90]">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-xl flex flex-col gap-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center border-b pb-2">Mock Controls</p>
          <button 
            onClick={() => setState({ ...state, isLoading: !state.isLoading })}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${state.isLoading ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}
          >
            Toggle Loading
          </button>
          <button 
            onClick={() => setState({ ...state, error: state.error ? null : "Error: 'Wrong password'" })}
            className="px-3 py-2 bg-red-50 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-100 transition-all"
          >
            Simulate Error
          </button>
          <button 
            onClick={() => setState({ 
              ...state, 
              validationErrors: Object.keys(state.validationErrors).length > 0 ? {} : { 
                email: "Email is required", 
                password: "Password is too short" 
              } 
            })}
            className="px-3 py-2 bg-blue-50 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-all"
          >
            Show Validation
          </button>
          <button 
            onClick={() => setState({ isLoading: false, error: null, validationErrors: {}, isSuccess: false })}
            className="px-3 py-2 bg-[#091426] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-all"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row min-h-screen relative">
        {/* Left Panel (Branding Illustration) - Hidden on mobile (<1024px) */}
        <div className="hidden lg:flex lg:w-3/5 xl:w-2/3 relative h-screen bg-black overflow-hidden">
          <img
            src="/Image1.png"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            alt="Library Branding"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D9D9D900] to-[rgba(0,0,0,0.8)]"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-[#FFF] font-inder text-9xl tracking-[0.5156em] text-center ml-[0.5156em] select-none">
              LIMA
            </h1>
          </div>

          <div className="absolute bottom-10 left-10 flex items-center gap-4">
             <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.16225C15.204 2.16225 15.5835 2.17462 16.8491 2.23238C18.2149 2.29463 19.482 2.568 20.457 3.54338C21.432 4.51837 21.7054 5.7855 21.768 7.15125C21.8258 8.4165 21.8381 8.796 21.8381 12.0004C21.8381 15.2048 21.8258 15.5839 21.768 16.8495C21.7057 18.2153 21.4324 19.4824 20.457 20.4574C19.482 21.4324 18.2145 21.7057 16.8491 21.7684C15.5839 21.8261 15.2044 21.8385 12 21.8385C8.79562 21.8385 8.41613 21.8261 7.15088 21.7684C5.78513 21.7061 4.518 21.4328 3.543 20.4574C2.568 19.4824 2.29463 18.2153 2.232 16.8495C2.17425 15.5835 2.16225 15.204 2.16225 12C2.16225 8.796 2.17462 8.4165 2.23238 7.15088C2.29463 5.78513 2.568 4.518 3.54338 3.543C4.51837 2.568 5.7855 2.29463 7.15125 2.232C8.4165 2.17425 8.796 2.16225 12 2.16225ZM12 0C8.74088 0 8.3325 0.013875 7.05225 0.072375C5.10225 0.16125 3.38925 0.639 2.01375 2.01412C0.639375 3.38888 0.16125 5.1015 0.072375 7.05225C0.013875 8.3325 0 8.74088 0 12C0 15.2591 0.013875 15.6675 0.072375 16.9478C0.16125 18.8978 0.639 20.6108 2.01412 21.9862C3.38888 23.361 5.10187 23.8391 7.05262 23.928C8.3325 23.9861 8.74088 24 12 24C15.2591 24 15.6675 23.9861 16.9478 23.9276C18.8974 23.8387 20.6108 23.361 21.9862 21.9859C23.361 20.6111 23.8391 18.8981 23.928 16.9474C23.9861 15.6675 24 15.2591 24 12C24 8.74088 23.9861 8.3325 23.9276 7.05225C23.8387 5.10225 23.361 3.38925 21.9859 2.01375C20.6111 0.639 18.8981 0.160875 16.9474 0.072C15.6675 0.013875 15.2591 0 12 0Z" fill="white" />
                </svg>
                <span className="text-white text-xs font-semibold tracking-[-0.01em]">Bakti Milineal</span>
             </div>
             <div className="flex items-center gap-2 ml-10">
                <span className="text-white text-xs font-medium tracking-[-0.01em]">Our Activities</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
          </div>
        </div>

        {/* Right Panel (Form Area) */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 min-h-screen">
          <div className="w-full max-w-[342px] flex flex-col gap-8">
            <header className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold tracking-[-0.01em]">Sign In</h2>
            </header>

            <form className="flex flex-col gap-6">
               <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold tracking-[0.01em]">Email Address</label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. researcher@university.edu"
                      className="w-full h-[52px] px-4 rounded-lg border border-[#C5C6CD] bg-[#F8F9FF] text-base focus:outline-none focus:ring-1 focus:ring-[#006A61] transition-all"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                    {state.validationErrors.email && (
                      <span className="text-red-500 text-xs mt-1">{state.validationErrors.email}</span>
                    )}
                  </div>
               </div>

               <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-semibold tracking-[0.01em]">Password</label>
                    <a href="#" className="text-[#006A61] text-xs font-medium tracking-[0.02em] hover:underline">Forgot Password?</a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-[52px] px-4 rounded-lg border border-[#C5C6CD] bg-[#F8F9FF] text-base focus:outline-none focus:ring-1 focus:ring-[#006A61] transition-all"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                    {state.validationErrors.password && (
                      <span className="text-red-500 text-xs mt-1">{state.validationErrors.password}</span>
                    )}
                  </div>
               </div>

               <button
                  type="button"
                  className="w-full h-[52px] rounded-lg bg-[#091426] text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={state.isLoading}
               >
                  {state.isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Sign In"
                  )}
               </button>

               <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-[#C5C6CD]"></div>
                  <span className="text-[#45474C] text-xs font-medium tracking-[0.02em]">OR</span>
                  <div className="flex-1 h-px bg-[#C5C6CD]"></div>
               </div>

               <button
                  type="button"
                  className="w-full h-[52px] rounded-lg border border-[#C5C6CD] bg-white text-[#0B1C30] font-semibold flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors"
               >
                  <div className="relative w-5 h-5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.6 10.2273C19.6 9.50394 19.5352 8.81076 19.4148 8.14481H10V12.0835H15.3815C15.1491 13.3358 14.4426 14.3971 13.3769 15.1108V17.6653H16.6231C18.5213 15.9176 19.6 13.313 19.6 10.2273Z" fill="#4285F4"/>
                      <path d="M10 20C12.7 20 14.9611 19.1045 16.6231 17.6659L13.3769 15.1114C12.4787 15.7136 11.3407 16.0727 10 16.0727C7.38981 16.0727 5.1787 14.3091 4.38981 11.9273H1.05648V14.5114C2.71019 17.7977 6.08889 20 10 20Z" fill="#34A853"/>
                      <path d="M4.38981 11.9273C4.18704 11.3227 4.0713 10.675 4.0713 10C4.0713 9.325 4.18704 8.67727 4.38981 8.07273V5.48864H1.05648C0.381481 6.84318 0 8.37955 0 10C0 11.6205 0.381481 13.1568 1.05648 14.5114L4.38981 11.9273Z" fill="#FBBC05"/>
                      <path d="M10 3.92727C11.4685 3.92727 12.787 4.43182 13.8241 5.41818L16.6963 2.54545C14.9574 0.968182 12.6954 0 10 0C6.08889 0 2.71019 2.20227 1.05648 5.48864L4.38981 8.07273C5.1787 5.69091 7.38981 3.92727 10 3.92727Z" fill="#EA4335"/>
                    </svg>
                  </div>
                  Sign in with Google
               </button>

               <div className="flex flex-col items-center gap-4 mt-2">
                  <p className="text-[#45474C] text-sm tracking-[-0.01em]">Don’t have an account? Create!</p>
                  <button type="button" className="w-full h-[52px] rounded-lg bg-[#091426] text-white font-semibold hover:opacity-90 transition-opacity">
                    Create Account
                  </button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
