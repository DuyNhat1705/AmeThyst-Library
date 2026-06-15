import React from 'react';
import Image from 'next/image';

interface BookCardProps {
  title: string;
  author: string;
  image: string;
}

export default function BookCard({ title, author, image }: BookCardProps) {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      {/* Book Cover Container */}
      <div className="relative w-full aspect-[3/4] bg-[#EAEAEA] rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>
      {/* Book Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-navy font-manrope text-base font-bold leading-tight line-clamp-2">
          {title}
        </h3>
        <p className="text-[#75777D] font-inter text-xs font-medium">
          {author}
        </p>
      </div>
    </div>
  );
}
