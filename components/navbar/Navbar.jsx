import Link from "next/link";
import CustomLink from "../CustomLink";
import MenuViewButton from "./MenuViewButton";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

export default function Navbar() {
  return (
    <nav className="fixed mx-6 my-4 z-20 w-[calc(100%-48px)] rounded-lg bg-black bg-opacity-40 backdrop-blur-lg border border-white border-opacity-20">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center space-x-3">
        <div className="hidden sm:flex items-center justify-between space-x-3">
          <Link
            href="/"
            className="bg-gradient-to-r from-light to-primary bg-clip-text text-transparent text-3xl font-bold flex"
          >
            <span className="text-xl ">TMDB</span>X
            <span className="text-xl  self-end">HUB</span>
          </Link>
        </div>

        <div className="w-[80%] sm:w-[40%]">
          <SearchBar />
        </div>

        <div className="items-center space-x-3 hidden xl:flex">
          <div className="space-x-4">
            <CustomLink path="/" className="hover:text-gray-300">
              Home
            </CustomLink>

            <CustomLink path="/compare-movies" className="hover:text-gray-300">
              Compare Movies
            </CustomLink>

            <CustomLink path="/watch-later" className="hover:text-gray-300">
              Watch List
            </CustomLink>
          </div>
          <UserProfile />
        </div>

        <div className="flex xl:hidden">
          <MenuViewButton />
        </div>
      </div>
    </nav>
  );
}
