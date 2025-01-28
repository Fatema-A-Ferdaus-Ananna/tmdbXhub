export default function SearchResultLoading() {
  return (
    <main className="container mx-auto px-4 pt-32 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Searching Movie.....</h1>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex w-full h-full rounded-lg cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-[260px] sm:h-[360px] rounded-lg bg-zinc-800 relative">
              <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                <div className="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
