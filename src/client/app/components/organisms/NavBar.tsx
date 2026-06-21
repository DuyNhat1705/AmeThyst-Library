"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';

export default function NavBar({ userActions }: { userActions?: React.ReactNode }) {
  const pathname = usePathname();
  return (
    // Giữ nguyên layout gốc, chỉ đổi màu nền bg-[#F2E5D8] thành bg-[#000] (màu đen Figma) và bỏ border-b để mất đường kẻ nhỏ
    <nav className="w-full h-[84px] bg-[#000] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo & Brand - Thay SVG cũ bằng SVG LIMA và đổi text Bookshelf thành LIMA */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2 w-[132px]">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit">
              <path d="M4 21.3333V12H6.66667V21.3333H4ZM12 21.3333V12H14.6667V21.3333H12ZM0 26.6667V24H26.6667V26.6667H0ZM20 21.3333V12H22.6667V21.3333H20ZM0 9.33333V6.66667L13.3333 0L26.6667 6.66667V9.33333H0Z" fill="white"/>
            </svg>
            <div className="flex flex-col items-start w-fit">
              <span className="text-[#FFF] font-inter text-2xl font-bold leading-8 w-fit tracking-[-0.025em]">LIMA</span>
            </div>
          </div>
        </Link>

        {/* Nav Links - Gồm Library, Dashboard, Study Together, Library Map */}
        <div className="hidden md:flex items-center gap-8">
          {['Library', 'Dashboard', 'Study Together', 'Library Map'].map((item) => {
            const href =
            item === 'Library' ? '/library' :
            item === 'Dashboard' ? '/dashboard' :
            item === 'Study Together' ? '/study' : '/map';

            const isActive = pathname === href;

            return (
              <Link
                key={item}
                href={href}
                className={`font-inter text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-[#486C7E]'
                    : 'text-[#FFF] hover:text-[#486C7E]' }`}>
                {item}
              </Link>
            );
          })}
        </div>

        {/* Auth Actions / Profile Actions */}
        <div className="flex items-center gap-4">
          {userActions ? userActions : (
            <>
              <Link href="/login" className="hidden sm:block font-inter text-sm font-semibold text-[#FFF] hover:text-[#486C7E] transition-colors">
                Sign In
              </Link>
              <Link href="/register">
                {/* Thêm các class hover và transition vào đây */}
                <Button 
                  variant="primary" 
                  className="px-6 py-2 h-auto rounded-lg bg-[#FFF] !text-[#000] hover:bg-[#375463] transition-all duration-200"
                >
                  Join Now
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}