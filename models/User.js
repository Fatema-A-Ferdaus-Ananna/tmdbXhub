import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous",
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    min: 2,
    max: 100,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    min: 6,
    max: 32,
  },
  policy: {
    required: true,
    type: Boolean,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
