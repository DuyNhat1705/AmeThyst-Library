"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PointerPage from '@/components/PointerPage';

export default function NavBar() {
    const pathname = usePathname();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/genres')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setGenres(data);
                }
            })
            .catch(err => console.error("Failed to fetch genres", err));
    }, []);

    const navLinks = [
    { name: 'Home', path: '/' , id:1},
    { name: 'Library', path: '/library' , id:2},
    { 
        name: 'Discovery', 
        path: '/surfing' , 
        id:3, 
        sublinks: genres.map(g => ({ name: g, path: `/surfing?genre=${encodeURIComponent(g)}` })) 
    },
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
