"use client";
import Link from "next/link";
import CustomLink from "../CustomLink";
import UserProfile from "./UserProfile";

export default function MenuViewPopUp() {
  return (
    <div className="absolute right-0 top-full mt-3 z-50">
      <div className="p-2 max-w-48 w-48 rounded-lg bg-black bg-opacity-90 backdrop-blur-md border border-white border-opacity-20">
        <ul className="flex flex-col text-center">
          <Link href="/" className="w-full  sm:hidden">
            <li className="px-3 py-2 ">
              <span className="text-xl font-bold flex justify-center transition-all hover:scale-110 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                <span className="text-xs">TMDB</span>X
                <span className="text-xs self-end">HUB</span>
              </span>
            </li>
          </Link>

          <CustomLink path="/" className="hover:text-gray-300 ">
            <li className="px-3 py-2 text-sm hover:rounded-lg hover:border hover:border-gray-300 hover:border-opacity-25 ">
              Home
            </li>
          </CustomLink>

          <CustomLink path="/compare-movies" className="hover:text-gray-300">
            <li className="px-3 py-2 text-sm hover:rounded-lg hover:border hover:border-gray-300 hover:border-opacity-25">
              Compare Movies
            </li>
          </CustomLink>

          <CustomLink path="/watch-later" className="hover:text-gray-300">
            <li className="px-3 py-2 text-sm hover:rounded-lg hover:border hover:border-gray-300 hover:border-opacity-25">
              Watch Later
            </li>
          </CustomLink>

          <Link href={`/login`} className="w-full">
            <li className="">
              <UserProfile mobileView={true} />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
