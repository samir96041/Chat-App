import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"; // Cloudinary is just an bucket for the images
import { generateToken } from "../utils/jsonwebtoken.js";

export const sigup = async (req, res) => {
  console.log("res: ", res);
  const { fullName, email, password } = req.body;
  console.log("password: ", password);

  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ message: "All fileds are required" });
    }
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    console.log("salt: ", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashedPassword: ", hashedPassword);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });
    console.log("newUser: ", newUser);

    if (newUser) {
      generateToken(newUser?._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilepic: newUser.profilePic
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("password: ", password);
  console.log("email: ", email);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      email: email
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isPassWordCorrect = await bcrypt.compare(password, user.password);
    if (!isPassWordCorrect) {
      res.status(400).json({
        message: "Incorrect passwords"
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilepic: user.profilepic
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic required" });
    }
    const uploadResposne = await cloudinary.uploader.upload(profilePic);
    console.log("uploadResposne: ", uploadResposne);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilePic: uploadResposne.secure_url
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    return res.status("error", error).json({ error });
  }
};


export const checkAuth = (req, res)=>{
  try {
    res.status(200).json(req.user)

  } catch (error) {
    console.log("error in checkauth controller", error.message);
    res.status(500).json({message:"Internal server error"})
  }
}