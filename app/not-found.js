export default function NotFound() {
  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-black bg-opacity-40 rounded-lg p-12 shadow-xl border border-red-600 border-opacity-50">
        <div className="text-center">
          <h1 className="text-red-600 text-3xl">
            THE PAGE YOU ARE LOOKING FOR IS NOT FOUND! (˶°ㅁ°) !!
          </h1>
        </div>
      </div>
    </div>
  );
}
