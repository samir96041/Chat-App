import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, //used unique because in all the documents email id should be unique
    fullName: { type: String },
    password: { type: String, require: true, minlength: 6 },
    profilePic: { type: String, default: "" }
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema)
export default user
