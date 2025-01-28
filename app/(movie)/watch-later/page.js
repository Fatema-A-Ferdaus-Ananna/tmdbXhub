import WatchLaterSection from "@/components/sections/WatchLaterSection";

export default async function WatchLaterPage() {
  return (
    <>
      <div className="container mx-auto pt-32 pb-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Watch Later</h1>
          <p className="text-light/70 mt-2">
            Movies you&apos;ve saved to watch in the future
          </p>
        </header>

        <WatchLaterSection />
      </div>
    </>
  );
}
