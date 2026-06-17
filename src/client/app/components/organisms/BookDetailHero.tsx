import Image from 'next/image';

interface BookDetailHeroProps {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  compact?: boolean;
}

export default function BookDetailHero({ title, author, description, coverImage, compact = false }: BookDetailHeroProps) {
  if (compact) {
    return (
      <div className="relative w-full aspect-[3/4.5] md:aspect-[3/4.2] overflow-hidden rounded-3xl transition-transform duration-500">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-12 w-full">
      <div className="w-full md:w-[479px] shrink-0">
        <Image
          src={coverImage}
          alt={title}
          width={479}
          height={691}
          className="rounded-3xl shadow-lg w-full h-auto"
          priority
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
