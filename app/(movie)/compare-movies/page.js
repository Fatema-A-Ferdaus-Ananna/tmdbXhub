import CompareSection from "@/components/sections/CompareSection";
import { getPopularMovie } from "@/lib/movie-info";

export default async function CompareMoviesPage() {
  const popularMovie = await getPopularMovie();
  //console.log("compare : ", popularMovie);

  return (
    <>
      <main className="container mx-auto px-4 pt-32 pb-8">
        <CompareSection popularMovie={popularMovie} />
      </main>
    </>
  );
}
