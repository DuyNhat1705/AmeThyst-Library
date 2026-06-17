import BookCard from '../molecules/BookCard';

interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

interface RecommendationCarouselProps {
  books: RecommendedBook[];
}

export default function RecommendationCarousel({ books }: RecommendationCarouselProps) {
  if (books.length === 0) return null;

  return (
    <section className="flex flex-col gap-8 w-full mt-24">
      <div className="flex justify-between items-end">
        <h2 className="text-[#091426] text-3xl md:text-4xl font-semibold tracking-[0.1em]">
          You May Also Like
        </h2>
        <div className="flex items-start gap-2">
           <button className="flex p-2 flex-col justify-center items-center rounded-full border border-[#C5C6CD] hover:bg-gray-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#0B1C30"/></svg>
           </button>
           <button className="flex p-2 flex-col justify-center items-center rounded-full border border-[#C5C6CD] hover:bg-gray-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="#0B1C30"/></svg>
           </button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide">
        {books.map((book) => (
          <div key={book.id} className="min-w-[280px]">
            <BookCard
              title={book.title}
              author={book.author}
              image={book.coverImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
