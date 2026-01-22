import express from "express";
import {
  logInUser,
  registerUser,
  registerSeller,
  logInAdmin,
  isTokenCorrect,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Root route for /api/users - returns available endpoints
userRouter.get("/", (req, res) => {
  res.json({
    success: true,
    message: "User API is working",
    endpoints: {
      public: [
        "POST /api/users/register - Register as buyer",
        "POST /api/users/register-seller - Register as seller",
        "POST /api/users/login - Login user",
        "POST /api/users/admin/login - Admin login",
        "GET /api/users/test - Test route"
      ],
      protected: [
        "GET /api/users/verify-token - Verify authentication token",
        "PUT /api/users/profile - Update user profile",
        "PUT /api/users/change-password - Change password",
        "DELETE /api/users/account - Delete account"
      ]
    }
  });
});

userRouter.get("/test", (req, res) => {
  res.json({ message: "User routes are working!" });
});

// Public routes
userRouter.post("/login", logInUser);
userRouter.post("/register", registerUser);
userRouter.post("/register-seller", registerSeller);
userRouter.post("/admin/login", logInAdmin);

// Protected routes
userRouter.get("/verify-token", protect, isTokenCorrect);
userRouter.put("/profile", protect, updateProfile);
userRouter.put("/change-password", protect, changePassword);
userRouter.delete("/account", protect, deleteAccount);

export default userRouter;
