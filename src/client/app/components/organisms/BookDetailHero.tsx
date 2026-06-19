import Image from 'next/image';

interface BookDetailHeroProps {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  compact?: boolean;
}

export default function BookDetailHero({ title, author, description, coverImage, compact = false }: BookDetailHeroProps) {
  let imageUrl = "/Rectangle1248.png";
  
  if (coverImage && !coverImage.startsWith('/')) {
    const isIsbn = /^[0-9X]{10,13}$/i.test(coverImage);
    if (isIsbn) {
      imageUrl = `https://covers.openlibrary.org/b/isbn/${coverImage}-L.jpg`;
    } else {
      const cleanId = coverImage.startsWith('OL_') ? coverImage.substring(3) : coverImage;
      imageUrl = `https://covers.openlibrary.org/b/olid/${cleanId}-L.jpg`;
    }
  } else if (coverImage) {
    imageUrl = coverImage;
  }

  if (compact) {
    return (
      <div className="relative w-full aspect-[3/4.5] md:aspect-[3/4.2] overflow-hidden rounded-3xl transition-transform duration-500 bg-[#EAEAEA]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
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
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-12 w-full">
      <div className="w-full md:w-[479px] shrink-0 bg-[#EAEAEA] rounded-3xl overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover"
          onError={(e) => {
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
      <div className="flex flex-col gap-6 flex-grow">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#091426] text-4xl md:text-5xl font-bold leading-tight tracking-[0.0833em]">
            {title}
          </h1>
          <p className="text-[#45474C] text-2xl font-semibold">
            {author}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-[#0B1C30] text-lg leading-relaxed">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
