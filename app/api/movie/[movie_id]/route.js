export async function GET(_request, { params }) {
  const movie_id = params.movie_id;

  if (!movie_id) {
    console.error("Missing movie_id in the request.");
    return new Response(JSON.stringify({ error: "Movie ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const [movieDetailsResponse, movieCastResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      ),
    ]);

    const movieDetails = await movieDetailsResponse.json();
    let movieCast = null;

    if (movieCastResponse.ok) {
      movieCast = await movieCastResponse.json();
    } else {
      console.log("Movie Cast API failed:", movieCastResponse.status);
      movieCast = { cast: [] }; // Default to empty array
    }

    movieCast = movieCast?.cast ? movieCast : { cast: [] };

    const data = {
      movieDetails,
      movieCast,
    };

    //console.log("Api Movie details data:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
