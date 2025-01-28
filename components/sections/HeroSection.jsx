"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection({ heroSectionMovies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % heroSectionMovies.length
      );
    }, 7000);

    return () => clearInterval(interval); // Clean up
  }, [heroSectionMovies.length]);

  const currentMovie = heroSectionMovies[currentIndex];

  return (
    <div
      className="relative h-screen"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${currentMovie?.backdrop_path})`,
        backgroundSize: "cover",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
      <div className="absolute bottom-0 left-0 p-12">
        <h1 id="heroTitle" className="text-3xl sm:text-5xl font-bold mb-4">
          {currentMovie?.title}
        </h1>
        <p className="text-lg max-w-2xl mb-5">
          <span className="sm:hidden">
            {currentMovie?.overview?.length > 100
              ? `${currentMovie?.overview.slice(0, 100)}...`
              : currentMovie?.overview}
          </span>
          <span className="hidden sm:block">{currentMovie?.overview}</span>
        </p>

        <Link
          href={`/movie/${currentMovie?.id}`}
          className="bg-white bg-opacity-90 text-black px-8 py-3 rounded-lg font-bold hover:bg-opacity-100 hover:shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300"
        >
          <i className="fa fa-file"></i> Details
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 py-12 px-12 ">
        <div className="flex gap-2">
          {heroSectionMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index
                  ? "bg-white bg-opacity-70"
                  : "bg-white bg-opacity-20"
              } transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
