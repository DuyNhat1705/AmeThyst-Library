import React from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';

export default function NavBar() {
  return (
    <nav className="w-full h-[84px] bg-[#F2E5D8] border-b border-[#EAEAEA] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#006F66] rounded-xl flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21L1 12L12 3L23 12L12 21ZM12 18.27L19.53 12L12 5.73L4.47 12L12 18.27Z" fill="white"/>
            </svg>
          </div>
          <span className="text-[#091426] font-manrope text-xl font-bold tracking-tight">Bookshelf</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Library', 'Community', 'About'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className={`font-inter text-sm font-semibold transition-colors ${
                item === 'Home' ? 'text-[#006F66]' : 'text-[#75777D] hover:text-[#091426]'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block font-inter text-sm font-semibold text-[#091426] hover:text-[#006F66] transition-colors">
            Sign In
          </Link>
          <Link href="/register">
            <Button variant="primary" className="px-6 py-2 h-auto rounded-lg">Join Now</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
