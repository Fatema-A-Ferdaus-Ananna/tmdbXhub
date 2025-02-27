"use client";
import { useState } from "react";

export default function ToggleSwitcher() {
  const [active, setActive] = useState("movie");

  return (
    <div className="px-2 py-1 flex justify-center items-center border rounded-full gap-4 border-gray-600 relative w-36">
      <div
        className={`absolute top-0 bottom-0 w-1/2 rounded-full transition-all bg-gradient-to-r from-moviedb-black to-primary-dark ${
          active === "movie" ? "left-0" : "left-1/2"
        }`}
      ></div>

      <button
        className={`w-1/2 py-1 text-center z-10 text-sm text-white`}
        onClick={() => setActive("movie")}
      >
        Movie
      </button>

      <button
        className={`w-1/2 py-1 text-center z-10 text-sm text-white`}
        onClick={() => setActive("series")}
      >
        Series
      </button>
    </div>
  );
}
