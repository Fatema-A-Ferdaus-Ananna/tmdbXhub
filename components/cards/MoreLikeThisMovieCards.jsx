import Image from "next/image";
import Link from "next/link";

export default async function MoreLikeThisMovieCards({ similarMoviesPromise }) {
  const similarMovies = await similarMoviesPromise;
  return (
    <>
      {similarMovies.map((similarMovie) => (
        <div
          key={similarMovie?.id}
          className="flex-shrink-0 w-48 h-[288px] cursor-pointer hover:scale-105 transition-transform relative"
        >
          <Link href={`/movie/${similarMovie?.id}`}>
            <Image
              fill
              src={`${process.env.TMDB_IMAGE_URL}/${similarMovie?.poster_path}`}
              alt={similarMovie?.title}
              className="w-full rounded-lg  bg-zinc-800"
            />
          </Link>
        </div>
      ))}
    </>
  );
}
