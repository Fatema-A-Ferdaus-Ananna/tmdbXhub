"use client";

import { performAddToWatchLaterList } from "@/actions/user";
import useAuth from "@/app/hooks/useAuth";
import useWatchLater from "@/app/hooks/useWatchLater";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToWatchList({ movieDetails }) {
  const [error, setError] = useState("");
  const [loadig, setLoading] = useState(false);
  const { auth } = useAuth();
  const { watchLater, setWatchLater } = useWatchLater();
  const router = useRouter();

  const isMovieInWatchList =
    watchLater?.length > 0 &&
    watchLater.some((movie) => movie.movieId === movieDetails.id);

  const [isAdded, setAdded] = useState(isMovieInWatchList);

  async function handleAddToWatchList() {
    if (auth?.foundUser) {
      const watchLaterData = {
        userId: auth.foundUser.id,
        movies: [
          {
            movieId: movieDetails.id,
            title: movieDetails.title,
            poster_path: movieDetails.poster_path,
            release_date: movieDetails.release_date,
          },
        ],
      };

      try {
        setLoading(true);
        const result = await performAddToWatchLaterList(watchLaterData);
        if (result.success === true) {
          const newWatchLaterMovie = result?.watchLater[0];

          confirm("Movie Add To Watch List");
          setWatchLater((prevWatchLater) => [
            ...(prevWatchLater || []),
            newWatchLaterMovie,
          ]);
          setLoading(false);
          setAdded(true);
        } else {
          setLoading(false);
          setError("Try Again! Movie have not added.");
        }
      } catch (error) {
        console.error("Error adding to Watch List:", error);
        setLoading(false);
        setError(error.message || "An unexpected error occurred");
      }
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      {isAdded ? (
        <div className="text-center">
          <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600 border border-green-600 border-opacity-25 hover:shadow-[0_0_5px_rgba(0,255,119,0.9)] transition-shadow duration-300">
            <AlreadyAddedSvg />
            Added to Watch List
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={handleAddToWatchList}
            className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white border-opacity-25 hover:shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-shadow duration-300"
          >
            <AddToWatchListSvg />
            Add to Watch List
          </button>
        </div>
      )}
      {loadig && (
        <div className="text-primary">Movie Is Adding! Wait a second</div>
      )}
      <div className="text-red-600">{error}</div>
    </div>
  );
}

export function AddToWatchListSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M12 11l0 6" />
      <path d="M9 14l6 0" />
    </svg>
  );
}

export function AlreadyAddedSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>
  );
}
