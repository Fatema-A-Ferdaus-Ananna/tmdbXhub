import Image from "next/image";
import Link from "next/link";

export default function MovieCardHome({ children, movie }) {
  return (
    <div className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
      <Link href={`/movie/${movie?.id}`}>
        <Image
          width={300}
          height={200}
          src={`${process.env.TMDB_IMAGE_URL}/${movie?.poster_path}`}
          alt={movie?.title}
          className="w-full rounded-lg  bg-zinc-800"
        />
        {children}
      </Link>
    </div>
  );
}
