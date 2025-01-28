import SearchResultCard from "@/components/cards/SearchResultCard";
import { getMovieBySearchingTitle } from "@/lib/movie-info";

export default async function SearchResultPage({
  searchParams: { movie_title },
}) {
  //console.log("movie Title:", movie_title);
  const decodedMovieTitle = decodeURIComponent(movie_title);
  const searchResults = await getMovieBySearchingTitle(decodedMovieTitle);
  //console.log("movie result:", searchResults);

  return (
    <>
      <main className="container mx-auto px-4 pt-32 pb-8">
        {/* <!-- Search Stats --> */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Search Results for{" "}
            <span className="text-primary">
              &quot;{decodedMovieTitle}&quot;
            </span>
          </h1>
          <p className="text-gray-400">
            Found &quot;{searchResults.length}&quot; results
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(searchResults) &&
            searchResults.map((searchResult) => (
              <SearchResultCard
                key={searchResult?.id}
                searchResult={searchResult}
              />
            ))}
        </div>
      </main>
    </>
  );
}
