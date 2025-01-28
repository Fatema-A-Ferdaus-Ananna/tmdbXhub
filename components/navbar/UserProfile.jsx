"use client";
import useAuth from "@/app/hooks/useAuth";
import useWatchLater from "@/app/hooks/useWatchLater";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserProfile({ mobileView }) {
  const { auth, setAuth } = useAuth();
  const { setWatchLater } = useWatchLater();
  const [showUserModal, setShowUserModal] = useState(false);
  const router = useRouter();

  function handleLogout() {
    setAuth(null);
    setWatchLater([]);

    router.push("/login");
  }

  return (
    <>
      {mobileView ? (
        <div className="flex flex-col items-center">
          {auth?.foundUser ? (
            <>
              <button
                onClick={handleLogout}
                className="px-3 py-2 w-full text-sm hover:bg-red-600 hover:bg-opacity-5 hover:rounded-lg hover:border hover:border-red-600 hover:border-opacity-25 hover:text-red-600 inline-block"
              >
                <span className="w-full inline-block transform duration-300 hover:scale-110">
                  Logout
                </span>
              </button>

              <div className="mt-2 px-3 py-2 w-full text-sm font-semibold flex gap-2 justify-between items-center bg-primary bg-opacity-5 rounded-lg border border-primary border-opacity-25 text-primary-dark">
                <span className="bg-gradient-to-b from-white via-primary to-primary-dark bg-clip-text text-transparent">
                  Hi! {auth?.foundUser?.name}
                </span>
                <div className="flex justify-center items-center">
                  <span className="text-4xl bg-gradient-to-b from-white via-primary to-primary-dark bg-clip-text text-transparent">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-2 w-full text-sm hover:bg-primary hover:bg-opacity-5 hover:rounded-lg hover:border hover:border-primary hover:border-opacity-25 hover:text-primary inline-block"
            >
              <span className="w-full inline-block transform duration-300 hover:scale-110">
                Login
              </span>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          {auth?.foundUser ? (
            <button
              onClick={handleLogout}
              className="mr-3 transform-all duration-300 hover:scale-110 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="mr-3 transform-all duration-300 hover:scale-110 hover:text-primary"
            >
              Login
            </Link>
          )}

          <div
            onMouseEnter={() => setShowUserModal(true)}
            onMouseLeave={() => setShowUserModal(false)}
            className="flex justify-center items-center rounded-full border-2 border-white w-8 h-8 p-3 cursor-pointer transform-all duration-300 hover:scale-110"
          >
            <span className="text-2xl text-white">
              <i className="fa fa-user"></i>
            </span>
          </div>

          {showUserModal && (
            <div className="absolute right-0 top-full mt-2 w-40 rounded-md bg-black bg-opacity-80 backdrop-blur-lg text-primary border border-white border-opacity-25  p-2 z-10 shadow-lg text-center font-bold">
              {auth?.foundUser ? (
                <span className="bg-gradient-to-b from-white via-primary to-primary-dark bg-clip-text text-transparent">
                  Hi!, {auth?.foundUser?.name}
                </span>
              ) : (
                <span>Please Login</span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
