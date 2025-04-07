import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, 
    fullName: { type: String },
    password: { type: String, require: true },
    profilePic: { type: String, default: "" }
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;
