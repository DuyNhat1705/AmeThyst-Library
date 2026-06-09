
"use client";
import { usePathname } from 'next/navigation';
import PointerPage from '@/components/PointerPage';

export default function NavBar() {
    const pathname = usePathname();
    const navLinks = [
    { name: 'Home', path: '/' , id:1},
    { name: 'Library', path: '/library' , id:2},
    { name: 'Surfing', path: '/surfing' , id:3},
    { name: 'Search', path: '/search' , id:4},
  ];

  return (
    <nav className="navBar">
      <ul className="navLinks">
        {navLinks.map((link) => (
        <PointerPage 
          key = {link.id}
          isActive={pathname === link.path} 
          link = {link}
        />
      ))}
      </ul>
    </nav>
  );
}