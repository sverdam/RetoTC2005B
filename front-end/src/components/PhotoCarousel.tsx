import { useState } from "react";

interface PhotoCarouselProps {
  images: string[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">

      {/* IMAGE */}
      <div className="relative h-60 md:h-80 lg:h-60 w-full overflow-hidden rounded-xl">
        <img
          src={images[current]}
          className="w-full h-full object-cover transition duration-500"
          alt="carousel"
        />
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[3px] rounded-full transition-all ${current === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
          />
        ))}
      </div>

      {/* PREV */}
      <button
        onClick={prev}
        className="absolute top-0 left-0 h-full px-4 flex items-center group"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 transition">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </button>

      {/* NEXT */}
      <button
        onClick={next}
        className="absolute top-0 right-0 h-full px-4 flex items-center group"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 transition">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

    </div>
  );
};

export default PhotoCarousel;