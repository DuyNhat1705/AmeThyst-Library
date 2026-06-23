import React from 'react';

interface GenreTagProps {
  genre: string;
  selected: boolean;
  onClick: () => void;
}

export default function GenreTag({ genre, selected, onClick }: GenreTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-inter text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
        selected
          ? 'bg-[#006F66] text-white shadow-sm'
          : 'bg-white text-[#45474C] border border-[#C5C6CD] hover:bg-gray-50'
      }`}
    >
      {genre}
    </button>
  );
}
