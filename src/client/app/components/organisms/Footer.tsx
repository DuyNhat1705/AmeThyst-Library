import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#091426] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21L1 12L12 3L23 12L12 21ZM12 18.27L19.53 12L12 5.73L4.47 12L12 18.27Z" fill="white"/>
                </svg>
              </div>
              <span className="text-xl font-manrope font-bold">Bookshelf</span>
            </div>
            <p className="text-[#A1A3A9] font-inter text-sm leading-relaxed">
              Empowering students through accessible knowledge and community-driven learning.
            </p>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-manrope font-bold mb-6">Library</h4>
            <ul className="flex flex-col gap-4 text-[#A1A3A9] font-inter text-sm">
              <li><a href="#" className="hover:text-teal transition-colors">All Books</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-manrope font-bold mb-6">Community</h4>
            <ul className="flex flex-col gap-4 text-[#A1A3A9] font-inter text-sm">
              <li><a href="#" className="hover:text-teal transition-colors">Study Groups</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Forums</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-manrope font-bold mb-6">Support</h4>
            <ul className="flex flex-col gap-4 text-[#A1A3A9] font-inter text-sm">
              <li><a href="#" className="hover:text-teal transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1C2638] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#75777D] font-inter text-xs">
            © 2026 AmeThyst Digital Library. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* Social Icons Placeholder */}
            {['Twitter', 'LinkedIn', 'Github'].map(social => (
              <a key={social} href="#" className="text-[#75777D] hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
