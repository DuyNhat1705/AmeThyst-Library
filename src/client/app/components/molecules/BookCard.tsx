import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
}

export default function BookCard({ id, title, author, image }: BookCardProps) {

  return (
    <Link href={`/library/${id}`} className="flex flex-col gap-3 group cursor-pointer block">
      {/* Book Cover Container */}
      <div className="relative w-full aspect-[3/4] bg-[#EAEAEA] rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Nếu dùng olid bị lỗi, thử fallback sang dùng chính book_id nguyên bản hoặc ảnh mặc định
            const currentSrc = (e.target as HTMLImageElement).src;
            if (currentSrc.includes('/b/olid/') && !currentSrc.includes('?fallback=1')) {
              const parts = currentSrc.split('/b/olid/');
              if (parts[1]) {
                const olid = parts[1].replace('-L.jpg', '');
                (e.target as HTMLImageElement).src = `https://covers.openlibrary.org/b/id/${olid}-L.jpg?fallback=1`;
                return;
              }
            }
            (e.target as HTMLImageElement).src = "/Rectangle1248.png";
          }}
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
    </Link>
  );
}
