"use client";
import Image from "next/image";

export default function ShowSelectedMovieCard({
  onRemove,
  movieDetailsForSlot,
}) {
  function formatToMillions(number) {
    if (!number) return "N/A";
    return `$${(number / 1000000).toFixed(1)}M`;
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex flex-col">
      <div className="flex justify-end mb-4">
        <button onClick={onRemove} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2 h-full">
          <Image
            width={300}
            height={500}
            src={`https://image.tmdb.org/t/p/original/${movieDetailsForSlot?.poster_path}`}
            alt={movieDetailsForSlot?.title}
            className="w-full rounded-lg mb-4 object-contain max-h-full"
          />
          <h2 className="text-xl font-bold mb-2 text-center">
            {movieDetailsForSlot?.title}
          </h2>
        </div>
        <div className="w-full space-y-4 col-span-3">
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Rating:</span>
            <span className="float-right">
              {movieDetailsForSlot?.vote_average}/10
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Release Year:</span>
            <span className="float-right">
              {movieDetailsForSlot?.release_date.split("-")[0]}
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Runtime:</span>
            <span className="float-right">
              {movieDetailsForSlot?.runtime} min
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Budget:</span>
            <span className="float-right">
              {formatToMillions(movieDetailsForSlot?.budget)}
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Revenue:</span>
            <span className="float-right">
              {formatToMillions(movieDetailsForSlot?.revenue)}
            </span>
          </div>
          <div className="bg-zinc-800 p-3 rounded">
            <span className="text-gray-400">Genres:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {movieDetailsForSlot?.genres?.map((genre) => (
                <span
                  key={genre?.id}
                  className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                >
                  {genre?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
