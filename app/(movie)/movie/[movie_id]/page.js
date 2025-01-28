import MoreLikeThisLoading from "@/components/cards/loading/MoreLikeThisLoading";
import MoreLikeThisMovieCards from "@/components/cards/MoreLikeThisMovieCards";
import MovieDetailSection from "@/components/sections/MovieDetailSection";
import { getMovieById, getSimilarMovieById } from "@/lib/movie-info";
import { Suspense } from "react";
import NotFoundMovie from "./not-found";

export async function generateMetadata({ params: { movie_id } }) {
  const movieDetailsDataPromise = getMovieById(movie_id);
  const movieDetailsData = await movieDetailsDataPromise;

  if (movieDetailsData !== null && movieDetailsData !== undefined) {
    const { movieDetails } = movieDetailsData;
    const { title, overview, poster_path, id } = movieDetails;
    const currentUrl = `${process.env.BASE_API_URL}/movie/${id}`;
    const posterImageUrl = `${process.env.TMDB_IMAGE_URL}${poster_path}`;

    return {
      title: `TMDBxHUB - ${title}`,
      description: overview,
      openGraph: {
        title: title,
        description: overview,
        url: currentUrl,
        type: "website",
        images: [
          {
            url: posterImageUrl,
            width: 1200,
            height: 630,
            alt: `${title} Poster`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: overview,
        images: [posterImageUrl],
      },
    };
  } else {
    return {
      title: "TMDBxHUB",
      description:
        "A Next.js project utilizing the TMDb API for movies and TV shows.",
    };
  }
}

export default async function MovieDetailPage({ params: { movie_id } }) {
  const movieDetailsDataPromise = getMovieById(movie_id);
  const similarMoviesPromise = getSimilarMovieById(movie_id);

  const movieDetailsData = await movieDetailsDataPromise;

  if (movieDetailsData !== null && movieDetailsData !== undefined) {
    return (
      <>
        <MovieDetailSection movieDetailsData={movieDetailsData} />

        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">More Like This</h2>

          <Suspense fallback={<MoreLikeThisLoading />}>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              <MoreLikeThisMovieCards
                similarMoviesPromise={similarMoviesPromise}
              />
            </div>
          </Suspense>
        </div>
      </>
    );
  } else {
    return <NotFoundMovie movie_id={movie_id} />;
  }
}
