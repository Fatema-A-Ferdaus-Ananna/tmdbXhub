"use client";
import ShowSelectedMovieCard from "./ShowSelectedMovieCard";

export default function CompareSelectCard({
  onRemove,
  onShowSelectModal,
  movieDetailsForSlot,
}) {
  return (
    <>
      {movieDetailsForSlot ? (
        <ShowSelectedMovieCard
          onRemove={onRemove}
          movieDetailsForSlot={movieDetailsForSlot}
        />
      ) : (
        <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
          <div className="flex justify-end mb-4">
            <button
              className="text-gray-400 hover:text-white"
              onClick={onRemove}
            >
              ✕
            </button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <button
              onClick={onShowSelectModal}
              className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Select Movie
            </button>
          </div>
        </div>
      )}
    </>
  );
}
