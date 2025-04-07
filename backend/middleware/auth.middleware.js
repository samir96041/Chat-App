import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log('token: ', token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded: ', decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const currentUser = await User.findById(decoded.userId).select("-password");
    console.log('user: ', currentUser);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = currentUser; // Attach user info to request
    next(); // Continue to the next middleware/route
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};
