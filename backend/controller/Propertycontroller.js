// @desc    Create a new property
// @route   POST /api/properties

import propertyModel from "../models/propertyData.model.js";
import userModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";


// Helper function to upload image to Cloudinary
// Accepts either a file path (string) or buffer (Buffer)
const uploadToCloudinary = async (imageFile) => {
  try {
    let result;
    
    if (Buffer.isBuffer(imageFile)) {
      // For buffers, use upload_stream
      result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "property-images",
            resource_type: "auto",
            transformation: [
              { width: 1200, height: 800, crop: "limit" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(imageFile);
      });
    } else {
      // For file paths or data URIs
      result = await cloudinary.uploader.upload(imageFile, {
        folder: "property-images",
        resource_type: "auto",
        transformation: [
          { width: 1200, height: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

// Helper function to parse nested FormData fields (e.g., "area[value]" -> {area: {value: ...}})
const parseNestedFields = (body) => {
  const parsed = {};
  
  for (const key in body) {
    const value = body[key];
    
    // Check if key contains brackets (nested field)
    if (key.includes('[') && key.includes(']')) {
      // Split by brackets to get nested path
      const parts = key.split(/[\[\]]/).filter(Boolean);
      
      let current = parsed;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      current[parts[parts.length - 1]] = value;
    } else {
      parsed[key] = value;
    }
  }
  
  return parsed;
};

export const createProperty = async (req, res) => {
  let uploadedImages = [];
  
  try {
    // Get user info for fallback values (req.user is set by protect middleware)
    const user = req.user || await userModel.findById(req.userId).select("name email phone");
    
    console.log("Creating property - User ID:", req.userId);
    console.log("Request body keys:", Object.keys(req.body));
    console.log("Files count:", req.files?.length || 0);

    // Handle image upload if files are present
    if (req.files && req.files.length > 0) {
      console.log("Uploading images to Cloudinary...");
      const uploadPromises = req.files.map(async (file, index) => {
        try {
          // Use buffer if available (memory storage), otherwise use path (disk storage)
          const imageSource = file.buffer || file.path;
          if (!imageSource) {
            throw new Error(`No image source found for file ${index}`);
          }
          
          const result = await uploadToCloudinary(imageSource);
          return {
            url: result.url,
            publicId: result.publicId,
            isPrimary: index === 0,
            caption: req.body[`caption_${index}`] || file.originalname,
          };
        } catch (uploadError) {
          console.error(`Failed to upload image ${index}:`, uploadError);
          throw uploadError;
        }
      });

      uploadedImages = await Promise.all(uploadPromises);
      console.log("Images uploaded successfully:", uploadedImages.length);
    }

    // Parse nested FormData fields into nested objects
    const parsedBody = parseNestedFields(req.body);
    console.log("Parsed body:", JSON.stringify(parsedBody, null, 2));
    
    // Helper function to clean empty strings (convert to undefined)
    const cleanValue = (value) => {
      if (value === '' || value === null) return undefined;
      return value;
    };
    
    // Convert string numbers to actual numbers and clean empty strings
    if (parsedBody.area?.value !== undefined && parsedBody.area.value !== '') {
      parsedBody.area.value = Number(parsedBody.area.value);
    }
    if (parsedBody.price?.amount !== undefined && parsedBody.price.amount !== '') {
      parsedBody.price.amount = Number(parsedBody.price.amount);
    }
    if (parsedBody.price?.negotiable !== undefined) {
      parsedBody.price.negotiable = parsedBody.price.negotiable === 'true' || parsedBody.price.negotiable === true;
    }
    if (parsedBody.features?.floorNumber !== undefined && parsedBody.features.floorNumber !== '') {
      parsedBody.features.floorNumber = Number(parsedBody.features.floorNumber);
    }
    if (parsedBody.features?.totalFloors !== undefined && parsedBody.features.totalFloors !== '') {
      parsedBody.features.totalFloors = Number(parsedBody.features.totalFloors);
    }
    if (parsedBody.features?.parking?.covered !== undefined && parsedBody.features.parking.covered !== '') {
      parsedBody.features.parking.covered = Number(parsedBody.features.parking.covered);
    }
    if (parsedBody.features?.parking?.open !== undefined && parsedBody.features.parking.open !== '') {
      parsedBody.features.parking.open = Number(parsedBody.features.parking.open);
    }
    if (parsedBody.features?.balconies !== undefined && parsedBody.features.balconies !== '') {
      parsedBody.features.balconies = Number(parsedBody.features.balconies);
    }
    
    // Handle amenities array (FormData sends as amenities[0], amenities[1], etc.)
    if (parsedBody.amenities && typeof parsedBody.amenities === 'object' && !Array.isArray(parsedBody.amenities)) {
      parsedBody.amenities = Object.values(parsedBody.amenities).filter(Boolean);
    }
    
    // Ensure owner object exists with required fields
    if (!parsedBody.owner) {
      parsedBody.owner = {};
    }
    
    // Clean empty strings from owner fields
    if (parsedBody.owner.name === '') parsedBody.owner.name = undefined;
    if (parsedBody.owner.phone === '') parsedBody.owner.phone = undefined;
    if (parsedBody.owner.email === '') parsedBody.owner.email = undefined;

    // Determine phone number - prioritize request phone, then user phone
    const ownerPhone = parsedBody.owner.phone || (user?.phone && user.phone.trim() !== '' ? user.phone : null);
    
    // Validate that phone is provided (required field)
    if (!ownerPhone || ownerPhone.trim() === '') {
      // Clean up uploaded images if validation fails
      if (uploadedImages.length > 0) {
        console.log("Cleaning up uploaded images due to validation error...");
        uploadedImages.forEach((img) => {
          if (img.publicId) {
            deleteFromCloudinary(img.publicId).catch(cleanupError => {
              console.error("Failed to cleanup image:", cleanupError);
            });
          }
        });
      }
      
      return res.status(400).json({
        success: false,
        message: "Phone number is required. Please provide a phone number in the property form or update your profile with a phone number.",
      });
    }

    // Set userId from authenticated user
    const propertyData = {
      ...parsedBody,
      userId: req.userId,
      owner: {
        name: parsedBody.owner.name || user?.name || 'Unknown',
        phone: ownerPhone.trim(),
        email: parsedBody.owner.email || user?.email || '',
        type: parsedBody.owner.type || 'owner',
        id: req.userId,
        verified: false,
      },
      images: uploadedImages || [],
    };
    
    // Remove undefined values to avoid validation issues
    Object.keys(propertyData).forEach(key => {
      if (propertyData[key] === undefined) {
        delete propertyData[key];
      }
    });
    
    if (propertyData.features) {
      Object.keys(propertyData.features).forEach(key => {
        if (propertyData.features[key] === undefined) {
          delete propertyData.features[key];
        }
      });
    }

    console.log("Creating property with data:", JSON.stringify(propertyData, null, 2));

    const property = new propertyModel(propertyData);
    await property.save();
    console.log("Property saved successfully:", property._id);

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
    console.error("Error creating property:", error);
    console.error("Error stack:", error.stack);
    
    // If property creation fails, delete uploaded images
    if (uploadedImages.length > 0) {
      console.log("Cleaning up uploaded images...");
      uploadedImages.forEach((img) => {
        if (img.publicId) {
          deleteFromCloudinary(img.publicId).catch(cleanupError => {
            console.error("Failed to cleanup image:", cleanupError);
          });
        }
      });
    }

    // Return appropriate status code
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    
    res.status(statusCode).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
  let uploadedImages = [];
  
  try {
    const property = await propertyModel.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Parse nested FormData fields into nested objects
    const parsedBody = parseNestedFields(req.body);
    console.log("Update - Parsed body:", JSON.stringify(parsedBody, null, 2));

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      console.log("Uploading new images to Cloudinary...");
      const uploadPromises = req.files.map(async (file, index) => {
        try {
        const imageSource = file.buffer || file.path;
          if (!imageSource) {
            throw new Error(`No image source found for file ${index}`);
          }
          
        const result = await uploadToCloudinary(imageSource);
        return {
          url: result.url,
          publicId: result.publicId,
          isPrimary: false,
          caption: req.body[`caption_${index}`] || file.originalname,
        };
        } catch (uploadError) {
          console.error(`Failed to upload image ${index}:`, uploadError);
          throw uploadError;
        }
      });

      uploadedImages = await Promise.all(uploadPromises);
      console.log("New images uploaded successfully:", uploadedImages.length);
    }

    // Handle existing images - get from existingImages array in FormData
    let existingImagesToKeep = [];
    if (parsedBody.existingImages && Object.keys(parsedBody.existingImages).length > 0) {
      // existingImages can be an array or object with numeric keys from FormData
      let existingImageUrls = [];
      if (Array.isArray(parsedBody.existingImages)) {
        existingImageUrls = parsedBody.existingImages;
      } else if (typeof parsedBody.existingImages === 'object') {
        existingImageUrls = Object.values(parsedBody.existingImages).filter(Boolean);
      }
      
      console.log("Existing image URLs to keep:", existingImageUrls);
      console.log("Property images:", property.images);
      
      // Match existing images from property.images by URL
      // existingImageUrls contains URL strings, need to find matching image objects from property
      existingImagesToKeep = property.images.filter(img => {
        const imgUrl = typeof img === 'string' ? img : (img?.url || img);
        // Check if this image URL is in the list of URLs to keep
        return existingImageUrls.some(url => {
          const urlStr = typeof url === 'string' ? url : (url?.url || url);
          return imgUrl === urlStr || imgUrl === url || url === imgUrl;
        });
      });
      
      console.log("Matched images to keep:", existingImagesToKeep.length);
    } else {
      // If no existingImages specified, keep all current images
      existingImagesToKeep = property.images || [];
      console.log("No existing images specified, keeping all:", existingImagesToKeep.length);
    }

    // Combine existing images with new uploaded images
    const updatedImages = [...existingImagesToKeep, ...uploadedImages];
    
    // If no images at all, keep original images
    const finalImages = updatedImages.length > 0 ? updatedImages : property.images;

    // Clean and convert values like in createProperty
    const cleanValue = (value) => {
      if (value === '' || value === null) return undefined;
      return value;
    };

    // Convert string numbers to actual numbers
    if (parsedBody.area?.value !== undefined && parsedBody.area.value !== '') {
      parsedBody.area.value = Number(parsedBody.area.value);
    }
    if (parsedBody.price?.amount !== undefined && parsedBody.price.amount !== '') {
      parsedBody.price.amount = Number(parsedBody.price.amount);
    }
    if (parsedBody.price?.negotiable !== undefined) {
      parsedBody.price.negotiable = parsedBody.price.negotiable === 'true' || parsedBody.price.negotiable === true;
    }
    if (parsedBody.features?.floorNumber !== undefined && parsedBody.features.floorNumber !== '') {
      parsedBody.features.floorNumber = Number(parsedBody.features.floorNumber);
    }
    if (parsedBody.features?.totalFloors !== undefined && parsedBody.features.totalFloors !== '') {
      parsedBody.features.totalFloors = Number(parsedBody.features.totalFloors);
    }
    if (parsedBody.features?.parking?.covered !== undefined && parsedBody.features.parking.covered !== '') {
      parsedBody.features.parking.covered = Number(parsedBody.features.parking.covered);
    }
    if (parsedBody.features?.parking?.open !== undefined && parsedBody.features.parking.open !== '') {
      parsedBody.features.parking.open = Number(parsedBody.features.parking.open);
    }
    if (parsedBody.features?.balconies !== undefined && parsedBody.features.balconies !== '') {
      parsedBody.features.balconies = Number(parsedBody.features.balconies);
    }

    // Handle amenities array
    if (parsedBody.amenities && typeof parsedBody.amenities === 'object' && !Array.isArray(parsedBody.amenities)) {
      parsedBody.amenities = Object.values(parsedBody.amenities).filter(Boolean);
    }

    // Remove undefined values
    Object.keys(parsedBody).forEach(key => {
      if (parsedBody[key] === undefined) {
        delete parsedBody[key];
      }
    });

    if (parsedBody.features) {
      Object.keys(parsedBody.features).forEach(key => {
        if (parsedBody.features[key] === undefined) {
          delete parsedBody.features[key];
        }
      });
    }

    // Remove existingImages from parsedBody as we've already processed it
    delete parsedBody.existingImages;

    // Ensure images are in correct format (objects with url property)
    const formattedImages = finalImages.map((img, index) => {
      if (typeof img === 'string') {
        // Convert string URL to object format
        return {
          url: img,
          isPrimary: index === 0,
          caption: '',
        };
      } else if (img && img.url) {
        // Already in correct format, ensure isPrimary is set correctly
        return {
          url: img.url,
          publicId: img.publicId,
          isPrimary: index === 0 || img.isPrimary || false,
          caption: img.caption || '',
        };
      }
      return img;
    });

    // Ensure at least one image exists (required by schema)
    if (formattedImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Build update data carefully to preserve required fields
    const updateData = {};
    
    // Preserve userId (required)
    updateData.userId = property.userId;
    
    // Update simple fields from parsedBody
    if (parsedBody.description !== undefined) updateData.description = parsedBody.description;
    if (parsedBody.propertyType !== undefined) updateData.propertyType = parsedBody.propertyType;
    if (parsedBody.listingType !== undefined) updateData.listingType = parsedBody.listingType;
    if (parsedBody.status !== undefined) updateData.status = parsedBody.status;
    if (parsedBody.amenities !== undefined) updateData.amenities = parsedBody.amenities;
    
    // Merge owner object - preserve all required fields
    if (parsedBody.owner) {
      updateData.owner = {
        id: parsedBody.owner.id || property.owner?.id || req.userId,
        name: parsedBody.owner.name || property.owner?.name || '',
        phone: parsedBody.owner.phone || property.owner?.phone || '',
        email: parsedBody.owner.email || property.owner?.email || '',
        type: parsedBody.owner.type || property.owner?.type || 'owner',
        verified: parsedBody.owner.verified !== undefined ? parsedBody.owner.verified : (property.owner?.verified || false),
      };
    } else {
      updateData.owner = property.owner;
    }
    
    // Merge location object - preserve all required fields
    if (parsedBody.location) {
      updateData.location = {
        address: parsedBody.location.address || property.location?.address || '',
        area: parsedBody.location.area || property.location?.area || '',
        city: parsedBody.location.city || property.location?.city || '',
        state: parsedBody.location.state || property.location?.state || '',
        pincode: parsedBody.location.pincode || property.location?.pincode || '',
        landmark: parsedBody.location.landmark || property.location?.landmark,
        coordinates: parsedBody.location.coordinates || property.location?.coordinates,
        nearby: parsedBody.location.nearby || property.location?.nearby,
      };
    } else {
      updateData.location = property.location;
    }
    
    // Merge area object - preserve all required fields
    if (parsedBody.area) {
      updateData.area = {
        value: parsedBody.area.value !== undefined ? parsedBody.area.value : property.area?.value,
        unit: parsedBody.area.unit || property.area?.unit || 'sqft',
      };
    } else {
      updateData.area = property.area;
    }
    
    // Merge price object - preserve all required fields
    if (parsedBody.price) {
      updateData.price = {
        amount: parsedBody.price.amount !== undefined ? parsedBody.price.amount : property.price?.amount,
        display: parsedBody.price.display || property.price?.display,
        negotiable: parsedBody.price.negotiable !== undefined ? parsedBody.price.negotiable : (property.price?.negotiable || false),
        pricePerSqft: parsedBody.price.pricePerSqft || property.price?.pricePerSqft,
      };
    } else {
      updateData.price = property.price;
    }
    
    // Merge features object
    if (parsedBody.features) {
      updateData.features = {
        ...property.features,
        ...parsedBody.features,
      };
    } else {
      updateData.features = property.features;
    }
    
    // Set images
    updateData.images = formattedImages;

    // Ensure all required fields are present (don't remove them even if undefined in parsedBody)
    // Required fields are already set above, so we just need to clean up optional undefined values
    
    // Clean up optional fields only (not required ones)
    if (updateData.features) {
      Object.keys(updateData.features).forEach(key => {
        if (updateData.features[key] === undefined && key !== 'parking') {
          delete updateData.features[key];
        }
      });
      // Ensure parking object exists
      if (updateData.features.parking) {
        if (updateData.features.parking.covered === undefined) updateData.features.parking.covered = 0;
        if (updateData.features.parking.open === undefined) updateData.features.parking.open = 0;
      }
    }

    console.log("Updating property with data:", JSON.stringify(updateData, null, 2));
    console.log("Property ID:", req.params.id);

    // Update the property - findByIdAndUpdate automatically uses $set
    const updatedProperty = await propertyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found after update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("========================================");
    console.error("Update property error:", error.message);
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    if (error.errors) {
      console.error("Validation errors:", JSON.stringify(error.errors, null, 2));
    }
    console.error("Error stack:", error.stack);
    console.error("========================================");
    
    // Clean up uploaded images if update fails
    if (uploadedImages.length > 0) {
      console.log("Cleaning up uploaded images due to error...");
      uploadedImages.forEach((img) => {
        if (img.publicId) {
          deleteFromCloudinary(img.publicId).catch(cleanupError => {
            console.error("Failed to cleanup image:", cleanupError);
          });
        }
      });
    }
    
    const isValidationError =
      error?.name === "ValidationError" ||
      error?.code === 121 || // Mongo document validation error
      error?.message?.toLowerCase?.().includes("validation");

    res.status(isValidationError ? 400 : 500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
      validationErrors: error?.errors
        ? Object.fromEntries(
            Object.entries(error.errors).map(([k, v]) => [k, v?.message || String(v)])
          )
        : undefined,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner only)
export const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Verify ownership (additional check)
    const propertyUserId = property.userId?.toString();
    const ownerId = property.owner?.id?.toString();
    const currentUserId = req.userId?.toString();
    
    if (propertyUserId !== currentUserId && ownerId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this property",
      });
    }

    // Delete all images from Cloudinary
    if (property.images && property.images.length > 0) {
      const deletePromises = property.images.map((img) => {
        if (img && img.publicId) {
          return deleteFromCloudinary(img.publicId).catch(err => {
            console.error('Error deleting image from Cloudinary:', err);
            // Continue even if image deletion fails
            return null;
          });
        }
        return null;
      }).filter(p => p !== null);
      
      if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
      }
    }

    // Delete the property
    await propertyModel.findByIdAndDelete(propertyId);

    // Remove property ID from user's propertyDataId array
    await userModel.findByIdAndUpdate(
      req.userId,
      { $pull: { propertyDataId: propertyId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);
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

    console.log("Fetching properties for user:", userId);

    // Query by userId - MongoDB will handle ObjectId comparison automatically
    // Try both direct match and string conversion
    const query = { userId: userId };

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

    console.log(`Found ${properties.length} properties for user ${userId}`);

    res.status(200).json({
      success: true,
      count: properties.length,
      totalProperties,
      totalPages,
      currentPage: Number(page),
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching user properties:", error);
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
      totalFavorites: properties.reduce(
        (sum, p) => sum + p.metrics.favorites,
        0
      ),
      totalInquiries: properties.reduce(
        (sum, p) => sum + p.metrics.inquiries,
        0
      ),
    };

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
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