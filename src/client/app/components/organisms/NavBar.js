"use client";

import React, { useState } from 'react';
import { NavLinks } from '../molecules/NavLinks';
import { NavLink } from '../atoms/NavLink';
import { HamburgerIcon } from '../atoms/HamburgerIcon';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 text-[#0B1C30]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight">LIMA</div>
        
        <NavLinks />
        
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-[#0B1C30] hover:text-[#006A61] transition-colors">Sign In</button>
          <button className="bg-[#091426] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Get Started</button>
          <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-6 border-t border-gray-200 bg-white">
          <ul className="flex flex-col gap-4">
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/about">About</NavLink></li>
            <li><NavLink href="/library">Library</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
};
