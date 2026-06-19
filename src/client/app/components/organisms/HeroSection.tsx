import React from 'react';
import { Button } from '../atoms/Button';
import searchBarBg from '../../assets/search_bar_bg.png';

export default function HeroSection() {
  return (
    <section 
      className="w-full bg-navy py-20 px-4 relative overflow-hidden"
      // 2. Use the imported asset here
      style={{ 
        backgroundImage: `url(${searchBarBg.src || searchBarBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat' 
      }}
    >

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal/10 skew-x-[-12deg] translate-x-20" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-orange/5 rounded-full blur-3xl -translate-x-10 translate-y-20" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <h1 className="text-white font-manrope text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl">
          Discover a World of <span className="text-orange">Knowledge</span> & Community
        </h1>
        <p className="text-[#A1A3A9] font-open-sans text-lg md:text-xl max-w-2xl mb-10">
          Join thousands of students and lifelong learners. Borrow books, join study groups, and track your learning journey in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="white" className="px-8 py-4 text-base text-black">Explore Library</Button>
          <Button variant="white" className="px-8 py-4 text-base text-black">How it Works</Button>
        </div>
      </div>
    </section>
  );
}
