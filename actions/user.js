"use server";

import {
  addToWatchLaterList,
  createUser,
  findLoginUserByCredentials,
  findWatchList,
  removeFromWatchLaterList,
} from "@/dbConnect/queries";
import { getMovieById, getMovieBySearchingTitle } from "@/lib/movie-info";
import { revalidatePath } from "next/cache";

export const addUser = async (formData) => {
  // Connect to MongoDB
  // await connectMongo();

  // Insert into DB
  try {
    const registerUser = await createUser(formData);
    //console.log("Regieter Use data ", registerUser);

    return { success: true };
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      console.error("Duplicate email detected:", error.message);
      return {
        success: false,
        message: "Email already exists. Please use a different email.",
      };
    } else {
      console.error("Error in addUser:", error.message);
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

export async function performLogin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const credentials = {
      email,
      password,
    };
    const foundUser = await findLoginUserByCredentials(credentials);

    if (foundUser) {
      const serializedWatchLaterList = await findWatchList(foundUser.id);
      const watchLaterList = serializedWatchLaterList.map((item) => ({
        ...item,
        userId: item.userId.toString(), // Convert userId to string
      }));

      return { foundUser, watchLaterList };
    }

    return { foundUser: null, watchLaterList: [] };
  } catch (error) {
    throw error;
  }
}

export async function searchMovieToCompare(movie_title) {
  try {
    const searchMovieResult = await getMovieBySearchingTitle(movie_title);

    return searchMovieResult;
  } catch (error) {
    throw error;
  }
}

export async function selectMovieToCompare(movie_id) {
  try {
    const movieResult = await getMovieById(movie_id);

    return movieResult;
  } catch (error) {
    throw error;
  }
}

export async function performAddToWatchLaterList(watchLaterData) {
  try {
    const result = await addToWatchLaterList(watchLaterData);

    if (result.success === true) {
      const simplifyResult = result.watchLater;

      // console.log("simplifyResult add movie", simplifyResult);

      revalidatePath("/");
      return result;
    }

    return { success: false };
  } catch (error) {
    console.error("Error in performAddToWatchLaterList:", error.message);
    throw error;
  }
}

export async function performRemoveFromWatchList(removeWatchLaterData) {
  try {
    const success = await removeFromWatchLaterList(removeWatchLaterData);
    if (success) {
      return { success: true };
    } else {
      return {
        success: false,
        message: "Movie not found in Watch Later list.",
      };
    }
  } catch (error) {
    console.error("Error in performRemoveFromWatchList:", error.message);
    throw new Error("Failed to remove movie from Watch Later list.");
  }
}
