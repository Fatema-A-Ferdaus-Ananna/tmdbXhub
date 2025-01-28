export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      console.error(
        `TMDB API Error: ${response.status} - ${response.statusText}`
      );
      return new Response(
        JSON.stringify({
          error: true,
          message: "Failed to fetch data from TMDB",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return new Response(
      JSON.stringify({ error: true, message: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
