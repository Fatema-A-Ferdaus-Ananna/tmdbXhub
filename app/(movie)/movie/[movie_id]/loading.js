export default function MovieDetailsLoading() {
  return (
    <div id="movieDetails" className="relative min-h-screen mb-8 ">
      <div className="relative">
        <div className="absolute inset-0">
          <div
            className="w-full h-full object-cover bg-dark"
            style={{ filter: "blur(5px)" }}
          ></div>
          <div className="absolute -inset-y-3 -inset-x-0 bg-gradient-to-t from-black via-black/70"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div class="w-full h-[500px] rounded-lg bg-zinc-800 relative">
                <div class="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                  <div class="animate-pulse w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite]"></div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 animate-pulse">
              <div className="w-[40%] h-10 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded mb-4"></div>

              <div className="flex items-center mb-4 space-x-4">
                <div className="h-6 w-24 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded"></div>
                <span>|</span>
                <div className="h-6 w-24 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded"></div>
              </div>

              <div className="h-24 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded mb-6"></div>

              <div className="mb-6">
                <div className="h-6 w-20 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded"></div>
                  <div className="h-6 w-16 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded"></div>
                  <div className="h-6 w-16 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded"></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="h-6 w-20 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded mb-2"></div>
                <div className="overflow-x-auto py-2 animate-pulse">
                  <div className="flex gap-4">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="text-center flex-shrink-0">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] mb-2"></div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="h-10 w-32 bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-[length:200%_100%] animate-[shimmer_.5s_infinite] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
