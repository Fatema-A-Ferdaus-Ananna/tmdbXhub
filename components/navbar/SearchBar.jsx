"use client";

import wait from "@/lib/wait";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  console.log("path name:", pathName);
  const router = useRouter();
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  async function handleSearch() {
    if (pathName === "/search-movie/search-result") {
      setLoading(true);
      await wait(1000);
    }
    console.log("Search query submitted:", query);
    if (query.trim()) {
      router.push(
        `/search-movie/search-result?movie_title=${encodeURIComponent(query)}`
      );
      setLoading(false);
      setQuery("");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center space-x-1">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query state
          onKeyDown={handleKeyDown} // Trigger search on Enter key
          className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border w-full border-white border-opacity-25 focus:outline-none focus:border-white"
        />
        <div
          onClick={handleSearch}
          className="bg-black bg-opacity-50 px-3 py-2  border border-white border-opacity-25 rounded cursor-pointer hover:bg-white hover:bg-opacity-20 transform duration-300"
        >
          {loading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            <i className="fa fa-search"></i>
          )}
        </div>
      </div>
    </>
  );
}
