import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Upload, X } from "lucide-react";

const EditProperty = () => {
  const { getAuthHeader, user, isSeller } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  const [formData, setFormData] = useState({
    description: "",
    propertyType: "flat",
    listingType: "sell",
    areaValue: "",
    areaUnit: "sqft",
    priceAmount: "",
    priceDisplay: "",
    negotiable: false,
    ownerName: user?.name || "",
    ownerPhone: "",
    ownerEmail: user?.email || "",
    address: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    furnished: "unfurnished",
    facing: "north",
    floorNumber: "",
    totalFloors: "",
    parking: { covered: 0, open: 0 },
    balconies: 0,
    amenities: [],
  });

  // Fetch property data on mount
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!isSeller) {
        setError("Only sellers can edit properties");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/api/properties/${id}`,
          { headers: getAuthHeader() }
        );

        if (response.data.success) {
          const property = response.data.property;

          // Set form data from fetched property
          setFormData({
            description: property.description || "",
            propertyType: property.propertyType || "flat",
            listingType: property.listingType || "sell",
            areaValue: property.area?.value || "",
            areaUnit: property.area?.unit || "sqft",
            priceAmount: property.price?.amount || "",
            priceDisplay: property.price?.display || "",
            negotiable: property.price?.negotiable || false,
            ownerName: property.owner?.name || user?.name || "",
            ownerPhone: property.owner?.phone || "",
            ownerEmail: property.owner?.email || user?.email || "",
            address: property.location?.address || "",
            area: property.location?.area || "",
            city: property.location?.city || "",
            state: property.location?.state || "",
            pincode: property.location?.pincode || "",
            furnished: property.features?.furnished || "unfurnished",
            facing: property.features?.facing || "north",
            floorNumber: property.features?.floorNumber || "",
            totalFloors: property.features?.totalFloors || "",
            parking: property.features?.parking || { covered: 0, open: 0 },
            balconies: property.features?.balconies || 0,
            amenities: property.amenities || [],
          });

          // Set existing images
          setExistingImages(property.images || []);
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setError("Failed to load property data. Please try again.");
      } finally {
        setFetchingData(false);
      }
    };

    fetchPropertyData();
  }, [id, isSeller, navigate, getAuthHeader, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages =
      existingImages.length -
      removedImages.length +
      images.length +
      files.length;

    if (totalImages > 20) {
      setError("Maximum 20 images allowed");
      return;
    }

    setImages([...images, ...files]);
  };

  const removeNewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageUrl) => {
    setRemovedImages([...removedImages, imageUrl]);
  };

  const restoreExistingImage = (imageUrl) => {
    setRemovedImages(removedImages.filter((url) => url !== imageUrl));
  };

  const handleAmenityChange = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter((a) => a !== amenity)
        : [...formData.amenities, amenity],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSeller) {
      setError("Only sellers can edit properties");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      // Append text fields
      data.append("description", formData.description);
      data.append("propertyType", formData.propertyType);
      data.append("listingType", formData.listingType);
      data.append("area[value]", formData.areaValue);
      data.append("area[unit]", formData.areaUnit);
      data.append("price[amount]", formData.priceAmount);
      data.append("price[display]", formData.priceDisplay);
      data.append("price[negotiable]", formData.negotiable);
      data.append("owner[name]", formData.ownerName);
      data.append("owner[phone]", formData.ownerPhone);
      data.append("owner[email]", formData.ownerEmail);
      data.append("owner[type]", "owner");
      data.append("location[address]", formData.address);
      data.append("location[area]", formData.area);
      data.append("location[city]", formData.city);
      data.append("location[state]", formData.state);
      data.append("location[pincode]", formData.pincode);
      data.append("features[furnished]", formData.furnished);
      data.append("features[facing]", formData.facing);
      data.append("features[floorNumber]", formData.floorNumber);
      data.append("features[totalFloors]", formData.totalFloors);
      data.append("features[parking][covered]", formData.parking.covered);
      data.append("features[parking][open]", formData.parking.open);
      data.append("features[balconies]", formData.balconies);

      // Append amenities
      formData.amenities.forEach((amenity, index) => {
        data.append(`amenities[${index}]`, amenity);
      });

      // Append existing images that weren't removed
      const remainingImages = existingImages.filter(
        (img) => !removedImages.includes(img)
      );
      remainingImages.forEach((imageUrl, index) => {
        data.append(`existingImages[${index}]`, imageUrl);
      });

      // Append new images
      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await axios.put(
        `http://localhost:8081/api/properties/${id}`,
        data,
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Property updated successfully!");
        navigate("/seller/my-properties");
      }
    } catch (error) {
      console.error("Failed to update property:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update property";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = [
    "parking",
    "gym",
    "swimming-pool",
    "garden",
    "security",
    "power-backup",
    "lift",
    "club-house",
  ];

  if (fetchingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Edit Property</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your property..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Listing Type *
                </label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Price Amount *
              </label>
              <input
                type="number"
                name="priceAmount"
                value={formData.priceAmount}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Display (e.g., 75L)
              </label>
              <input
                type="text"
                name="priceDisplay"
                value={formData.priceDisplay}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="75L, 1Cr"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>Price Negotiable</span>
            </label>
          </div>
        </div>

        {/* Area */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Area</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Area Size *
              </label>
              <input
                type="number"
                name="areaValue"
                value={formData.areaValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="1450"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unit *</label>
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqm">Square Meter</option>
                <option value="sqyd">Square Yard</option>
                <option value="acre">Acre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Location</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Full address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Vaishali Nagar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Jaipur"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Rajasthan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="302021"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Furnished
              </label>
              <select
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Facing</label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Floor Number
              </label>
              <input
                type="number"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Total Floors
              </label>
              <input
                type="number"
                name="totalFloors"
                value={formData.totalFloors}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Balconies
              </label>
              <input
                type="number"
                name="balconies"
                value={formData.balconies}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="2"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4"
                />
                <span className="capitalize">{amenity.replace("-", " ")}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Images</h2>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Current Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((imageUrl, index) => {
                  const isRemoved = removedImages.includes(imageUrl);
                  return (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Existing ${index}`}
                        className={`w-full h-32 object-cover rounded-lg ${
                          isRemoved ? "opacity-30" : ""
                        }`}
                      />
                      {isRemoved ? (
                        <button
                          type="button"
                          onClick={() => restoreExistingImage(imageUrl)}
                          className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded"
                        >
                          Restore
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeExistingImage(imageUrl)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      )}
                      {index === 0 && !isRemoved && (
                        <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upload New Images */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700">
                Upload new images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">
              PNG, JPG, GIF up to 5MB (Max 20 images total)
            </p>
          </div>

          {/* New Image Previews */}
          {images.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-3">New Images to Upload</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`New ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? "Updating Property..." : "Update Property"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/seller/my-properties")}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
