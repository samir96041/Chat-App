import express from "express";
import { login, logout, sigup, checkAuth } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/sigup", sigup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, logout);
router.get("/check",protectRoute, checkAuth)

export default router;
