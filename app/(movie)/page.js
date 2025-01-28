import MovieCardHome from "@/components/cards/MovieCardHome";
import HeroSection from "@/components/sections/HeroSection";
import MovieSection from "@/components/sections/MovieSection";
import {
  getNowTopRatedMovie,
  getPopularMovie,
  getTrendingMovie,
} from "@/lib/movie-info";

export default async function MovieHomePage() {
  // Initialize data variables and error flags
  let trendingMovie = [];
  let popularMovie = [];
  let topRatedMovie = [];
  let heroSectionMovies = [];

  try {
    // Fetch trending movies
    const trendingResponse = await getTrendingMovie();
    if (trendingResponse?.error) {
      console.error(
        "Error fetching trending movies:",
        trendingResponse.message
      );
    } else {
      trendingMovie = trendingResponse;
      heroSectionMovies = trendingMovie.slice(2, 7);
    }

    // Fetch popular movies
    const popularResponse = await getPopularMovie();
    if (popularResponse?.error) {
      console.error("Error fetching popular movies:", popularResponse.message);
    } else {
      popularMovie = popularResponse;
    }

    // Fetch top-rated movies
    const topRatedResponse = await getNowTopRatedMovie();
    if (topRatedResponse?.error) {
      console.error(
        "Error fetching top-rated movies:",
        topRatedResponse.message
      );
    } else {
      topRatedMovie = topRatedResponse;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }

  // Render fallback UI if no data is available
  if (!trendingMovie.length && !popularMovie.length && !topRatedMovie.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-500">
          Failed to load movie data. Please try again later.
        </p>
      </div>
    );
  }

  //console.log("data trending", trendingMovie);

  return (
    <>
      <HeroSection heroSectionMovies={heroSectionMovies} />

      <div className="container mx-auto px-4 py-8">
        <MovieSection sectionName="Trending Now">
          <div
            id="trendingMovies"
            className="flex space-x-4 overflow-x-auto pb-4"
          >
            {trendingMovie.map((tm) => (
              <MovieCardHome key={tm.id} movie={tm}>
                <div className="mt-2">
                  <h3 className="text-light text-sm font-bold truncate">
                    {tm?.title}
                  </h3>
                  <p className="text-primary text-xs">
                    {tm.release_date?.split("-")[0]}
                  </p>
                </div>
              </MovieCardHome>
            ))}
          </div>
        </MovieSection>

        <MovieSection sectionName="Popular on MOVIE DB">
          <div
            id="popularMovies"
            className="flex space-x-4 overflow-x-auto pb-4"
          >
            {popularMovie.map((pm) => (
              <MovieCardHome key={pm.id} movie={pm} />
            ))}
          </div>
        </MovieSection>

        <MovieSection sectionName="Top Rated">
          <div
            id="topRatedMovies"
            className="flex space-x-4 overflow-x-auto pb-4"
          >
            {topRatedMovie.map((trm) => (
              <MovieCardHome key={trm.id} movie={trm} />
            ))}
          </div>
        </MovieSection>
      </div>
    </>
  );
}
