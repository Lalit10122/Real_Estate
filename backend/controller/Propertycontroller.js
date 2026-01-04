

// @desc    Create a new property
// @route   POST /api/properties

import propertyModel from "../models/propertyData.model.js";
import userModel from "../models/user.model.js";
export const createProperty = async (req, res) => {
  try {
    // Set userId from authenticated user
    const propertyData = {
      ...req.body,
      userId: req.userId, // From auth middleware
      owner: {
        ...req.body.owner,
        id: req.userId, // Ensure owner.id matches authenticated user
      },
    };

    const property = new propertyModel(propertyData);
    await property.save();

    // Add property ID to user's propertyDataId array
    await userModel.findByIdAndUpdate(
      req.userId,
      { $push: { propertyDataId: property._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};

// @desc    Get all properties with filters, pagination, and sorting
// @route   GET /api/properties
// @access  Public
export const getAllProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      propertyType,
      listingType,
      city,
      area,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      furnished,
      status = "active",
      isFeatured,
      isVerified,
      isPremium,
      amenities,
    } = req.query;

    // Build query object
    const query = {};

    if (status) query.status = status;
    if (propertyType) query.propertyType = propertyType;
    if (listingType) query.listingType = listingType;
    if (city) query["location.city"] = new RegExp(city, "i");
    if (area) query["location.area"] = new RegExp(area, "i");
    if (furnished) query["features.furnished"] = furnished;
    if (isFeatured !== undefined) query.isFeatured = isFeatured === "true";
    if (isVerified !== undefined) query.isVerified = isVerified === "true";
    if (isPremium !== undefined) query.isPremium = isPremium === "true";

    // Price range filter
    if (minPrice || maxPrice) {
      query["price.amount"] = {};
      if (minPrice) query["price.amount"].$gte = Number(minPrice);
      if (maxPrice) query["price.amount"].$lte = Number(maxPrice);
    }

    // Area range filter
    if (minArea || maxArea) {
      query["area.value"] = {};
      if (minArea) query["area.value"].$gte = Number(minArea);
      if (maxArea) query["area.value"].$lte = Number(maxArea);
    }

    // Amenities filter (property must have all specified amenities)
    if (amenities) {
      const amenitiesArray = amenities.split(",");
      query.amenities = { $all: amenitiesArray };
    }

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const totalProperties = await propertyModel.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / Number(limit));

    // Execute query
    const properties = await propertyModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      totalProperties,
      totalPages,
      currentPage: Number(page),
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Increment views when property is viewed
    await property.incrementViews();

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner only)
export const updateProperty = async (req, res) => {
  try {
    // Property ownership already checked in middleware (req.property exists)
    const updatedProperty = await propertyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner only)
export const deleteProperty = async (req, res) => {
  try {
    // Property ownership already checked in middleware (req.property exists)
    await propertyModel.findByIdAndDelete(req.params.id);

    // Remove property ID from user's propertyDataId array
    await userModel.findByIdAndUpdate(
      req.userId,
      { $pull: { propertyDataId: req.params.id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
export const getFeaturedProperties = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const properties = await propertyModel.findFeatured().limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured properties",
      error: error.message,
    });
  }
};

// @desc    Get trending properties
// @route   GET /api/properties/trending
// @access  Public
export const getTrendingProperties = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const properties = await propertyModel.findTrending().limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending properties",
      error: error.message,
    });
  }
};

// @desc    Search properties by location
// @route   GET /api/properties/search/location
// @access  Public
export const searchByLocation = async (req, res) => {
  try {
    const { city, area, limit = 20 } = req.query;

    if (!city && !area) {
      return res.status(400).json({
        success: false,
        message: "Please provide city or area for search",
      });
    }

    const properties = await propertyModel
      .searchByLocation(city, area)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search properties",
      error: error.message,
    });
  }
};

// @desc    Get properties by user
// @route   GET /api/properties/user/me
// @access  Private
export const getPropertiesByUser = async (req, res) => {
  try {
    // Use authenticated user's ID
    const userId = req.userId;
    const { page = 1, limit = 10, status } = req.query;

    const query = { userId };
    
    // Optionally filter by status
    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const totalProperties = await propertyModel.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / Number(limit));

    const properties = await propertyModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      totalProperties,
      totalPages,
      currentPage: Number(page),
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user properties",
      error: error.message,
    });
  }
};

// @desc    Increment favorites
// @route   POST /api/properties/:id/favorite
// @access  Private
export const incrementFavorites = async (req, res) => {
  try {
    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await property.incrementFavorites();

    res.status(200).json({
      success: true,
      message: "Property added to favorites",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to favorites",
      error: error.message,
    });
  }
};

// @desc    Increment inquiries
// @route   POST /api/properties/:id/inquiry
// @access  Private
export const incrementInquiries = async (req, res) => {
  try {
    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await property.incrementInquiries();

    res.status(200).json({
      success: true,
      message: "Inquiry recorded",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to record inquiry",
      error: error.message,
    });
  }
};

// @desc    Update property status
// @route   PATCH /api/properties/:id/status
// @access  Private (Owner only)
export const updatePropertyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "active",
      "inactive",
      "sold",
      "rented",
      "pending",
      "draft",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Property ownership already checked in middleware
    const property = await propertyModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Property status updated",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

// @desc    Get property statistics
// @route   GET /api/properties/stats
// @access  Private/Admin
export const getPropertyStats = async (req, res) => {
  try {
    const totalProperties = await propertyModel.countDocuments();
    const activeProperties = await propertyModel.countDocuments({
      status: "active",
    });
    const soldProperties = await propertyModel.countDocuments({
      status: "sold",
    });
    const rentedProperties = await propertyModel.countDocuments({
      status: "rented",
    });
    const featuredProperties = await propertyModel.countDocuments({
      isFeatured: true,
    });

    // Properties by type
    const propertiesByType = await propertyModel.aggregate([
      {
        $group: {
          _id: "$propertyType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Properties by listing type
    const propertiesByListingType = await propertyModel.aggregate([
      {
        $group: {
          _id: "$listingType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Average price by property type
    const avgPriceByType = await propertyModel.aggregate([
      {
        $group: {
          _id: "$propertyType",
          avgPrice: { $avg: "$price.amount" },
          minPrice: { $min: "$price.amount" },
          maxPrice: { $max: "$price.amount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalProperties,
          activeProperties,
          soldProperties,
          rentedProperties,
          featuredProperties,
        },
        propertiesByType,
        propertiesByListingType,
        avgPriceByType,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};

// @desc    Search properties with advanced filters
// @route   POST /api/properties/search/advanced
// @access  Public
export const advancedSearch = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      filters = {},
    } = req.body;

    const query = { status: "active" };

    // Apply filters dynamically
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        query[key] = filters[key];
      }
    });

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);
    const totalProperties = await propertyModel.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / Number(limit));

    const properties = await propertyModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      totalProperties,
      totalPages,
      currentPage: Number(page),
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Advanced search failed",
      error: error.message,
    });
  }
};

// @desc    Get user profile with property details
// @route   GET /api/properties/user/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get property details for user's properties
    const properties = await propertyModel.find({
      _id: { $in: user.propertyDataId },
    });

    // Calculate statistics
    const stats = {
      totalProperties: properties.length,
      activeProperties: properties.filter((p) => p.status === "active").length,
      soldProperties: properties.filter((p) => p.status === "sold").length,
      rentedProperties: properties.filter((p) => p.status === "rented").length,
      totalViews: properties.reduce((sum, p) => sum + p.metrics.views, 0),
      totalFavorites: properties.reduce((sum, p) => sum + p.metrics.favorites, 0),
      totalInquiries: properties.reduce((sum, p) => sum + p.metrics.inquiries, 0),
    };

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isBuyer: user.isBuyer,
          createdAt: user.createdAt,
        },
        stats,
        properties: properties.map((p) => ({
          id: p._id,
          description: p.description,
          propertyType: p.propertyType,
          listingType: p.listingType,
          price: p.price,
          location: p.location,
          status: p.status,
          images: p.images,
          metrics: p.metrics,
          createdAt: p.createdAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};