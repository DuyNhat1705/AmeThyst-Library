"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Sidebar({ username }: { username: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="lg:hidden p-4 text-[#091426]"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <aside className={`${isOpen ? 'block' : 'hidden'} lg:block w-[330px] min-h-screen bg-[#F8EFE6] border-r border-[#000000] p-6 flex flex-col gap-6 sticky top-0 h-screen overflow-y-auto`}>
        <div className="flex flex-col items-center gap-4">
          <button className="w-20 h-20 bg-[#486C7E] rounded-full text-white font-bold text-2xl hover:scale-105 transition-transform">
            {username.split(' ').map(n => n[0]).join('')}
          </button>
          <div className="flex flex-col items-center space-y-3">
            <h2 className="text-lg font-bold text-[#45474C]">{username}</h2>
            <span className="bg-[#86F2E4] text-[#006F66] px-3 py-1 rounded-full text-sm font-semibold">Student</span>
          </div>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EAEAEA] active:bg-[#D4D4D4] transition-all text-[#091426]">
            <span>👤</span> Profile
          </Link>
          <Link href="/profile/security" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#EAEAEA] active:bg-[#D4D4D4] transition-all text-[#091426]">
            <span>🔒</span> Security
          </Link>
        </nav>
        
        <div className="flex justify-center mt-auto">
          <button 
              className="p-3 w-full max-w-[200px] rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all font-semibold"
              onClick={() => console.log('Logout clicked')}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
