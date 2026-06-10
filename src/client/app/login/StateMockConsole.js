"use client";

import React from 'react';

const StateMockConsole = ({ state, setState }) => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-[90]">
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-xl flex flex-col gap-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center border-b pb-2">Mock Controls</p>
        <button 
          onClick={() => setState(prev => ({ ...prev, isLoading: !prev.isLoading }))}
          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${state.isLoading ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}
        >
          Toggle Loading
        </button>
        <button 
          onClick={() => setState(prev => ({ ...prev, error: prev.error ? null : "Error: 'Wrong password'" }))}
          className="px-3 py-2 bg-red-50 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-100 transition-all"
        >
          Simulate Error
        </button>
        <button 
          onClick={() => setState(prev => ({ 
            ...prev, 
            validationErrors: Object.keys(prev.validationErrors).length > 0 ? {} : { 
              email: "Email is required", 
              password: "Password is too short" 
            } 
          }))}
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
  );
};

export default StateMockConsole;
