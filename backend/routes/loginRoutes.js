import express from "express";
import { handleLogin, addingEmployes, verifyToken } from "../controllers/authController.js";

const router = express.Router();

// Post Method
router.post("/login", handleLogin);
router.post("/register", verifyToken, addingEmployes);
router.get("/refresh", verifyToken);

export default router;
