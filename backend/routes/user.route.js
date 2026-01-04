import express from "express";
import {
  logInUser,
  registerUser,
  registerSeller,
  logInAdmin,
  isTokenCoreect,
} from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser); // Register as buyer
router.post("/register-seller", registerSeller); // Register as seller
router.post("/login", logInUser); // Login

// Admin routes
router.post("/admin/login", logInAdmin); // Admin login

// Protected routes
router.get("/verify-token", protect, isTokenCoreect); // Verify if token is valid

export default router;
