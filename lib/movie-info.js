import wait from "./wait";

export async function getTrendingMovie() {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/movie/trendingMovie`
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return { error: true, message: "Failed to fetch trending movies" };
    }

    const { results } = await response.json();
    await wait(500); // Optional delay for debugging/demo purposes

    return results;
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function getPopularMovie() {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/movie/popularMovie`
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return { error: true, message: "Failed to fetch popular movies" };
    }

    const { results } = await response.json();
    await wait(500); // Optional delay
    return results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function getNowTopRatedMovie() {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/movie/topRatedMovie`
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return { error: true, message: "Failed to fetch top-rated movies" };
    }

    const { results } = await response.json();
    await wait(500); // Optional delay
    return results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function getMovieById(movie_id) {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/movie/${movie_id}`
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return { error: true, message: "Failed to fetch movie details" };
    }

    const data = await response.json();
    const { movieDetails } = data;

    if (movieDetails?.success === false) {
      return null; // If movie details indicate failure, return null
    }

    await wait(1000); // Optional delay
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function getSimilarMovieById(movie_id) {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/similarMovie/${movie_id}`
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return { error: true, message: "Failed to fetch similar movies" };
    }

    const { results } = await response.json();
    await wait(3500); // Optional long delay
    return results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function getMovieBySearchingTitle(movie_title) {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/movie_title/${movie_title}`
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return { error: true, message: "Failed to fetch movies by title" };
    }

    const { results } = await response.json();
    await wait(500); // Optional delay
    return results;
  } catch (error) {
    console.error("Error fetching movies by title:", error);
    return { error: true, message: "Internal Server Error" };
  }
}

// export async function getMovieImageById(movie_id) {
//   // api call -->https://api.themoviedb.org/3/movie/{movie_id}/images
// }
