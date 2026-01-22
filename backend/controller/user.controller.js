import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check the password
    const isMatchPass = await bcrypt.compare(password, user.password);

    if (isMatchPass) {
      const token = createToken(user._id);
      res.json({
        success: true,
        message: "Login successful",
        userName: user.name,
        userId: user._id,
        isBuyer: user.isBuyer,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// @desc    Register user as buyer
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validation email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validation of strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // Generate new user (buyer by default)
    const newUser = new userModel({
      name,
      email,
      phone: phone || "",
      password: hashPass,
      isBuyer: true, // Default is buyer
    });

    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully as buyer",
      userName: user.name,
      userId: user._id,
      isBuyer: user.isBuyer,
      token,
    });
  } catch (error) {
    console.log("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// @desc    Register user as seller
// @route   POST /api/users/register-seller
// @access  Public
const registerSeller = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validation email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validation of strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // Generate new user as seller
    const newUser = new userModel({
      name,
      email,
      phone: phone || "",
      password: hashPass,
      isBuyer: false, // Seller
    });

    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      userName: user.name,
      userId: user._id,
      isBuyer: user.isBuyer,
      token,
    });
  } catch (error) {
    console.log("Seller Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during seller registration",
      error: error.message,
    });
  }
};

// @desc    Admin login
// @route   POST /api/users/admin/login
// @access  Public
const logInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // Check the password
    const isMatchPass = await bcrypt.compare(password, user.password);

    if (isMatchPass) {
      const token = createToken(user._id);
      res.json({
        success: true,
        message: "Admin login successful",
        userName: user.name,
        userId: user._id,
        role: user.role,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log("Admin Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin login",
      error: error.message,
    });
  }
};

// @desc    Verify token and get user info
// @route   GET /api/users/verify-token
// @access  Private
const isTokenCorrect = async (req, res) => {
  try {
    // User is already attached to req by protect middleware
    res.json({
      success: true,
      message: "Token is valid",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone || "",
        isBuyer: req.user.isBuyer,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Changed from req.user.id to req.user._id
    const { name, phone, location, bio } = req.body;

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        { name, phone, location, bio },
        { new: true, runValidators: true },
      )
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Update Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const userId = req.user._id; // Changed from req.user.id to req.user._id
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both current and new password",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long",
      });
    }

    // Find user with password field
    const user = await userModel.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password using bcrypt.compare directly
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash and update new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("Change Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update password",
      error: error.message,
    });
  }
};

// @desc    Delete account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id; // Changed from req.user.id to req.user._id

    // Optional: Delete all user's properties, favorites, etc.
    // await propertyModel.deleteMany({ userId });
    // await favoriteModel.deleteMany({ userId });

    // Delete user
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log("Delete Account Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};

export {
  logInUser,
  registerUser,
  registerSeller,
  logInAdmin,
  isTokenCorrect,
  updateProfile,
  changePassword,
  deleteAccount,
};

// Note: Fixed typo in original function name from "isTokenCoreect" to "isTokenCorrect"
export { isTokenCorrect as isTokenCoreect };
