import Image from "next/image";
import Link from "next/link";

export default function SearchResultCard({ searchResult }) {
  return (
    <Link
      href={`/movie/${searchResult?.id}`}
      className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
    >
      <Image
        width={300}
        height={500}
        src={`${process.env.TMDB_IMAGE_URL}/${searchResult?.poster_path}`}
        alt={searchResult?.title}
        className="w-full h-[180px] sm:h-[360px] object-cover"
      />
      <div className="p-4 text-xs sm:text-sm">
        <h3 className="font-bold mb-2">{searchResult?.title}</h3>
        <div className="flex justify-between  text-gray-400">
          <span>2022</span>
          <span>⭐ {searchResult?.vote_average}</span>
        </div>
      </div>
    </Link>
  );
}
