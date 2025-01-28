"use client";
import useAuth from "@/app/hooks/useAuth";
import useWatchLater from "@/app/hooks/useWatchLater";
import Link from "next/link";
import WatchLaterCard from "../cards/WatchLaterCard";
import EmptyWatchList from "./EmptyWatchList";

export default function WatchLaterSection() {
  const { auth } = useAuth();
  const { watchLater, setWatchLater } = useWatchLater();

  return (
    <>
      {auth?.foundUser ? (
        <>
          {watchLater?.length > 0 ? (
            <div
              id="watchLaterList"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {watchLater.map((movie) => (
                <WatchLaterCard key={movie.movieId} movie={movie} />
              ))}
            </div>
          ) : (
            <EmptyWatchList />
          )}
        </>
      ) : (
        <div className="text-center py-40 ">
          <p className="text-light/70 mb-6">
            Explore movies and add them to your list to watch later
          </p>
          <Link
            href="/login"
            className="bg-primary-dark text-dark px-6 py-2 rounded-md hover:bg-primary transition"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}
