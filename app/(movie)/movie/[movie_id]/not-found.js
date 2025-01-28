export default function NotFoundMovie({ movie_id }) {
  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-black bg-opacity-40 rounded-lg p-12 shadow-xl border border-red-600 border-opacity-50">
        <div className="text-center">
          <h1 className="text-gray-200 text-3xl">
            The Movie With Id{" "}
            <span className="text-primary"> &quot;{movie_id}&quot;</span> you
            requested could not be found!
          </h1>
          <p className="py-2">Try With Valid Movie Id!</p>
        </div>
      </div>
    </div>
  );
}
