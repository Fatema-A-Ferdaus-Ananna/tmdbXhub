import Image from "next/image";
import AddToWatchList from "../buttons/AddToWatchList";
import SocialMediaShareSection from "./SocialMediaShareSection";

export default function MovieDetailSection({ movieDetailsData }) {
  const { movieDetails, movieCast } = movieDetailsData;
  const formattedDate = movieDetails?.release_date
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(movieDetails.release_date))
    : "Release date not available";

  return (
    <div id="movieDetails" className="relative min-h-screen mb-8 ">
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            width={300}
            height={200}
            src={`${process.env.TMDB_IMAGE_URL}/${movieDetails?.backdrop_path}`}
            alt={movieDetails?.title}
            className="w-full h-full object-cover"
            style={{ filter: "blur(5px)" }}
          />
          <div className="absolute -inset-y-3 -inset-x-0 bg-gradient-to-t from-black via-black/70"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                width={300}
                height={200}
                src={`${process.env.TMDB_IMAGE_URL}/${movieDetails?.poster_path}`}
                alt={movieDetails?.title}
                className="w-full rounded-lg shadow-lg bg-black bg-opacity-40"
              />
            </div>

            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{movieDetails?.title}</h1>

              <div className="flex items-center mb-4 space-x-4">
                <span className="text-primary"> {formattedDate} </span>
                <span>| </span>
                <span>{movieDetails?.runtime} minutes</span>
              </div>

              <p className="text-lg mb-6">{movieDetails?.overview}</p>

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movieDetails?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Cast</h3>
                <div className="overflow-x-auto py-2">
                  {movieCast?.cast && movieCast.cast.length > 0 ? (
                    <div className="flex gap-4">
                      {movieCast.cast.map((cast) => (
                        <div
                          key={cast.id}
                          className="text-center flex-shrink-0"
                        >
                          <Image
                            width={300}
                            height={200}
                            src={`${process.env.TMDB_IMAGE_URL}/${cast.profile_path}`}
                            alt={cast.name}
                            className="w-24 h-24 rounded-full object-cover mb-2 bg-black bg-opacity-50"
                          />
                          <p className="text-sm">{cast.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-left text-red-500 text-sm mb-2">
                      Cast info not found
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6 ">
                <AddToWatchList movieDetails={movieDetails} />
              </div>

              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <SocialMediaShareSection movieDetails={movieDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
