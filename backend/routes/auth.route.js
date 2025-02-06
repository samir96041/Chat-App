 import express from "express";
import { login, logout, sigup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/sigup", sigup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
