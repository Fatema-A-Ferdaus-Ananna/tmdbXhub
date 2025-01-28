"use client";

import { searchMovieToCompare, selectMovieToCompare } from "@/actions/user";
import Image from "next/image";
import { useState } from "react";

export default function SearchModal({
  setShowSelectedModal,
  popularMovie,
  setMovieDetailsForSlot,
}) {
  const [searchMovieList, setSearchMovieList] = useState(popularMovie || null);
  const [error, setError] = useState("");

  async function onSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    const searchData = new FormData(event.currentTarget);
    const movie_title = searchData.get("movieTitle");

    if (!movie_title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    setError("");

    try {
      const searchResult = await searchMovieToCompare(movie_title);
      setSearchMovieList(searchResult);
    } catch (error) {
      setError("Failed to fetch search results. Please try again.");
    }
  }

  async function handleSelectedMovieToCompare(event, movie_id) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const movieResultData = await selectMovieToCompare(movie_id);
      const { movieDetails } = movieResultData;
      setMovieDetailsForSlot(movieDetails);
    } catch (error) {
      setError("Failed to get movie. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Search Movie</h2>
          <button
            onClick={() => setShowSelectedModal(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <form onSubmit={onSearch}>
          <div className="text-red-600">{error}</div>
          <input
            type="text"
            placeholder="Type movie name..."
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            name="movieTitle"
          />
          <button
            type="submit"
            className="my-2 px-4 py-2 bg-primary-dark text-dark rounded hover:bg-primary"
          >
            Search
          </button>
        </form>

        <div className="max-h-96 overflow-y-auto">
          {searchMovieList && searchMovieList.length > 0 ? (
            searchMovieList.map((pm) => (
              <div
                onClick={(event) => handleSelectedMovieToCompare(event, pm?.id)}
                key={pm?.id}
                className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
              >
                <Image
                  width={100}
                  height={100}
                  src={`https://image.tmdb.org/t/p/original/${pm?.poster_path}`}
                  alt={pm?.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{pm?.title}</h3>
                  <p className="text-sm text-gray-400">
                    {pm.release_date.split("-")[0]}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              No results found (´•︵•`)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
