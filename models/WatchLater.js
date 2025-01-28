import mongoose from "mongoose";

const watchLaterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movies: [
    {
      movieId: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      poster_path: {
        type: String,
        required: true,
      },
      release_date: {
        type: String,
        required: true,
      },
    },
  ],
});

// No need for a unique constraint on movieId here.

const WatchLater =
  mongoose.models.WatchLater || mongoose.model("WatchLater", watchLaterSchema);

export default WatchLater;
