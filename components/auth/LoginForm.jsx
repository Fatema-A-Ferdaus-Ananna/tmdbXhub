"use client";

import { performLogin } from "@/actions/user";
import useAuth from "@/app/hooks/useAuth";
import useWatchLater from "@/app/hooks/useWatchLater";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const { watchLater, setWatchLater } = useWatchLater();
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      //server action
      setLoding(true);
      const formData = new FormData(event.currentTarget);
      const foundUserData = await performLogin(formData);

      const { foundUser } = foundUserData;
      console.log("Login User Id ", foundUserData);
      console.log("Login User watchlist ", foundUserData.watchLaterList.length);

      if (foundUser) {
        setAuth(foundUserData);
        if (foundUserData.watchLaterList.length > 0) {
          console.log(
            "Login User movies watchlist ",
            foundUserData.watchLaterList[0].movies
          );
          const movies = foundUserData.watchLaterList[0].movies;
          console.log("Login User movies watchlist (to set): ", movies);

          // Update the watchLater state
          setWatchLater(movies);
          console.log("Login User movies watchlist ", watchLater);
        } else {
          setWatchLater([]);
          console.log("Login User movies watchlist if lenght 0", watchLater);
        }

        router.push("/");
        setLoding(false);
      } else {
        setError("Please Submit Valid Credentials!");
        setLoding(false);
      }
    } catch (error) {
      setLoding(false);
      setError(error.message || "An unexpected error occurred");
    }
  }

  return (
    <>
      <div className="my-2 text-red-600">{error}</div>
      {loading && <div className="text-primary my-2">Logging .......</div>}

      <form id="loginForm" className="space-y-4" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          name="password"
        />
        <button
          type="submit"
          className="w-full bg-primary-dark text-dark py-3 rounded hover:bg-primary transition duration-300"
        >
          Sign In
        </button>
      </form>
    </>
  );
}
