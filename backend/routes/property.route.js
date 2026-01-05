import express from "express";
import multer from "multer";
import path from "path";
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

// Configure multer for file uploads (memory storage for Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Public routes (no authentication required)
// Note: Specific routes must come before parameterized routes (/:id)
router.get("/featured", getFeaturedProperties); // Get featured properties
router.get("/trending", getTrendingProperties); // Get trending properties
router.get("/search/location", searchByLocation); // Search by location
router.post("/search/advanced", advancedSearch); // Advanced search
router.get("/stats", getPropertyStats); // Get property statistics
router.get("/", getAllProperties); // Get all properties with filters

// Protected routes - Require authentication
// User's own properties (must come before /:id route)
router.get("/user/me", protect, getPropertiesByUser);
router.get("/user/profile", protect, getUserProfile);

// Create property - Only sellers can create (with file upload support)
router.post("/", protect, checkSeller, upload.array('images', 20), createProperty);

// Parameterized routes (must come after specific routes)
router.get("/:id", getPropertyById); // Get single property
router.put("/:id", protect, checkPropertyOwnership, upload.array('images', 20), updateProperty); // Update property
router.delete("/:id", protect, checkPropertyOwnership, deleteProperty); // Delete property
router.patch("/:id/status", protect, checkPropertyOwnership, updatePropertyStatus); // Update property status

// Add to favorites - Authenticated users only
router.post("/:id/favorite", protect, incrementFavorites);

// Record inquiry - Authenticated users only
router.post("/:id/inquiry", protect, incrementInquiries);

export default router;