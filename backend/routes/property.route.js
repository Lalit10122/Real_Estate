import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getTrendingProperties,
  searchByLocation,
  getPropertiesByUser,
  incrementFavorites,
  incrementInquiries,
  updatePropertyStatus,
  getPropertyStats,
  advancedSearch,
  getUserProfile,
} from "../controller/Propertycontroller.js";

// Import auth middleware
import { protect, checkPropertyOwnership, checkSeller } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/", getAllProperties); // Get all properties with filters
router.get("/featured", getFeaturedProperties); // Get featured properties
router.get("/trending", getTrendingProperties); // Get trending properties
router.get("/search/location", searchByLocation); // Search by location
router.post("/search/advanced", advancedSearch); // Advanced search
router.get("/stats", getPropertyStats); // Get property statistics
router.get("/:id", getPropertyById); // Get single property

// Protected routes - Require authentication
// Create property - Only sellers can create
router.post("/", protect, checkSeller, createProperty);

// Update property - Only owner can update
router.put("/:id", protect, checkPropertyOwnership, updateProperty);

// Delete property - Only owner can delete
router.delete("/:id", protect, checkPropertyOwnership, deleteProperty);

// Update property status - Only owner can update
router.patch("/:id/status", protect, checkPropertyOwnership, updatePropertyStatus);

// User's own properties
router.get("/user/me", protect, getPropertiesByUser);

// User profile with properties and statistics
router.get("/user/profile", protect, getUserProfile);

// Add to favorites - Authenticated users only
router.post("/:id/favorite", protect, incrementFavorites);

// Record inquiry - Authenticated users only
router.post("/:id/inquiry", protect, incrementInquiries);

export default router;