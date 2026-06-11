import React from 'react';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className="p-2 focus:outline-none md:hidden">
      <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
      <div className={`w-6 h-0.5 bg-black my-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
      <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
    </button>
  );
};
