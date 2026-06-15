import React from 'react';
import BookCard from '../molecules/BookCard';

const BOOKS = [
  { id: 1, title: "The Design of Everyday Things", author: "Don Norman", image: "/Rectangle1248.png" },
  { id: 2, title: "Don't Make Me Think", author: "Steve Krug", image: "/Rectangle1248.png" },
  { id: 3, title: "Sprint: How to Solve Big Problems", author: "Jake Knapp", image: "/Rectangle1248.png" },
  { id: 4, title: "Universal Principles of Design", author: "William Lidwell", image: "/Rectangle1248.png" },
];

const CATEGORIES = ["All", "Science", "History", "Arts & Humanities"];

export default function PopularPublishes() {
  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      {/* Section Header */}
      <h2 className="text-navy font-manrope text-2xl font-bold tracking-[0.01em] mb-6">
        Popular Publishes
      </h2>

      {/* Categories Toggle */}
      <div className="flex flex-wrap gap-4 border-b border-[#C5C6CD] pb-4 mb-8">
        {CATEGORIES.map((category, index) => (
          <button
            key={index}
            className={`font-inter text-sm font-semibold px-2 py-1 transition-all cursor-pointer ${
              index === 0 
                ? "text-teal border-b-2 border-teal" 
                : "text-[#75777D] hover:text-navy"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {BOOKS.map((book) => (
          <BookCard 
            key={book.id}
            title={book.title}
            author={book.author}
            image={book.image}
          />
        ))}
      </div>
    </div>
  );
}
