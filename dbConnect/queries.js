import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/app/utils/dataUtils";
import User from "@/models/User";
import WatchLater from "@/models/WatchLater";
import connectMongo from "./connectMongo";

export async function createUser(userData) {
  await connectMongo();
  return await User.create(userData);
}

export const findLoginUserByCredentials = async (credentials) => {
  await connectMongo();
  const user = await User.findOne(credentials).lean();

  //console.log("log user db data", user);
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
};

export async function findWatchList(auth_id) {
  await connectMongo();
  const watchList = await WatchLater.find({ userId: auth_id }).lean();

  return replaceMongoIdInArray(watchList);
}

export async function addToWatchLaterList(watchLaterData) {
  await connectMongo();
  const { userId, movies } = watchLaterData;

  try {
    const addedMovies = [];

    for (const movie of movies) {
      // Update the user's watch later list and get the updated document
      const updatedDocument = await WatchLater.findOneAndUpdate(
        { userId, "movies.movieId": { $ne: movie.movieId } },
        {
          $addToSet: { movies: movie },
        },
        { new: true, upsert: true } // Return the updated document and create if not exists
      );

      // Check if the movie was added
      if (updatedDocument) {
        addedMovies.push(movie);
      }
    }

    return { success: true, watchLater: addedMovies };
  } catch (error) {
    console.error("Error in addToWatchLaterList:", error.message);
    throw new Error("Failed to add movies to Watch Later list");
  }
}

export async function removeFromWatchLaterList(removeWatchLaterData) {
  await connectMongo();
  const { userId, movieId } = removeWatchLaterData;

  try {
    const result = await WatchLater.updateOne(
      { userId }, // Match userId
      { $pull: { movies: { movieId } } },
      { new: true }
    );

    return { success: result.modifiedCount > 0 };
  } catch (error) {
    console.error("Error in removeFromWatchLaterList:", error.message);
    throw new Error("Failed to remove movie from Watch Later list");
  }
}
