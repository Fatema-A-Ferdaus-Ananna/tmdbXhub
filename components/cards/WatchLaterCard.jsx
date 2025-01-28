"use client";
import { performRemoveFromWatchList } from "@/actions/user";
import useAuth from "@/app/hooks/useAuth";
import useWatchLater from "@/app/hooks/useWatchLater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WatchLaterCard({ movie }) {
  const [loadig, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { auth } = useAuth();
  const { watchLater, setWatchLater } = useWatchLater();

  // console.log("Auth:", auth);
  // console.log("Watch Later:", watchLater);

  async function handleRemoveFromWatchLater(event, movieId) {
    event.preventDefault();
    event.stopPropagation();

    if (auth?.foundUser) {
      const removeWatchLaterData = {
        userId: auth.foundUser.id,
        movieId: movieId,
      };

      try {
        setLoading(true);
        const result = await performRemoveFromWatchList(removeWatchLaterData);

        if (result.success) {
          setLoading(false);
          confirm(`${movie.title} succfully removed from watch list.`);

          setWatchLater((prevWatchLater) =>
            prevWatchLater.filter((item) => item.movieId !== movie.movieId)
          );
        } else {
          setLoading(false);
          setError(`${movie.title} can not remove from watch list.`);
        }
      } catch (error) {
        console.error("Error adding to Watch List:", error);
        setLoading(false);
        setError(error.message || "An unexpected error occurred");
      }
    } else {
      setError("No User Found!");
    }
  }

  function handleWatchMovie(event) {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/movie/${movie?.movieId}`);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div
          onClick={handleWatchMovie}
          className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative cursor-pointer border-b border-white border-opacity-20 transition-transform hover:scale-105 duration-300"
        >
          <Image
            width={300}
            height={500}
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt="Armor"
            className="w-full h-[260px] sm:h-[420px] object-cover bg-zinc-800"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
          <div className="absolute inset-0 opacity-100 flex flex-col justify-end p-4">
            <h2 className="text-xs sm:text-xl font-bold text-light mb-2">
              {movie?.title}
            </h2>
            <div className="flex justify-between items-center">
              <span className="text-primary">
                {movie?.release_date?.split("-")[0]}
              </span>

              <button
                onClick={(event) =>
                  handleRemoveFromWatchLater(event, movie?.movieId)
                }
                className="bg-red-600 text-light px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="my-2">
          {loadig && (
            <div className="text-red-600 ">
              Movie Is Removing! Wait a second.
            </div>
          )}
          <div className="my-2 text-red-600">{error}</div>
        </div>
      </div>
    </>
  );
}
