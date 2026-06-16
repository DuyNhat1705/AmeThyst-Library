import React from 'react';

interface HomeLayoutProps {
  navbar: React.ReactNode;
  hero: React.ReactNode;
  searchBar: React.ReactNode;
  popularPublishes: React.ReactNode;
  footer: React.ReactNode;
}

export default function HomeLayout({
  navbar,
  hero,
  searchBar,
  popularPublishes,
  footer
}: HomeLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {navbar}
      <div className="flex flex-col">
        {hero}
        {searchBar}
        {popularPublishes}
      </div>
      {footer}
    </div>
  );
}
