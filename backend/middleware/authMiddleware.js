import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


// Middleware to protect routes (require authentication)
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, please login",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database (excluding password)
      const user = await userModel.findById(decoded.id).select("-password");
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      
      // Add user info to request object
      req.user = user;
      req.userId = user._id.toString();
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in authentication",
      error: error.message,
    });
  }
};

// Middleware to authorize specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};

// Middleware to check if user owns the resource
export const checkOwnership = (model) => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      }

      // Check if user owns the resource
      if (resource.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Not authorized to access this resource",
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error in ownership check",
        error: error.message,
      });
    }
  };
};

// Middleware specifically for checking property ownership
export const checkPropertyOwnership = async (req, res, next) => {
  try {
    // Import here to avoid circular dependency
    const propertyModel = (await import("../models/propertyData.model.js")).default;
    
    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if user owns the property
    // Compare userId field in property with authenticated user's ID
    const propertyUserId = property.userId?.toString();
    const ownerId = property.owner?.id?.toString();
    const currentUserId = req.userId?.toString();
    
    if (propertyUserId !== currentUserId && ownerId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this property",
      });
    }

    // Attach property to request for use in controller
    req.property = property;
    next();
  } catch (error) {
    console.error("Property ownership check error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in ownership check",
      error: error.message,
    });
  }
};

// Middleware to check if user is a seller (not a buyer)
export const checkSeller = async (req, res, next) => {
  try {
    // Ensure user object exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Check if user is a buyer (isBuyer === true means buyer, isBuyer === false means seller)
    // Also handle undefined/null cases - default to buyer for safety
    if (req.user.isBuyer === true || req.user.isBuyer === undefined || req.user.isBuyer === null) {
      return res.status(403).json({
        success: false,
        message: "Only sellers can create properties. Please register as a seller or contact support to upgrade your account.",
        userType: req.user.isBuyer === true ? 'buyer' : 'unknown',
      });
    }

    // User is a seller (isBuyer === false)
    next();
  } catch (error) {
    console.error("Seller check error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in seller check",
      error: error.message,
    });
  }
};