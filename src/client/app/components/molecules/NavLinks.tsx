import React from 'react';
import { NavLink } from '../atoms/NavLink';

export const NavLinks = () => {
  return (
    <ul className="hidden md:flex items-center gap-8">
      <li><NavLink href="/">Home</NavLink></li>
      <li><NavLink href="/about">About</NavLink></li>
      <li><NavLink href="/library">Library</NavLink></li>
    </ul>
  );
};
