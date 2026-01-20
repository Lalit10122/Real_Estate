import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Edit, Trash2, Eye, Heart, MessageSquare, Plus } from "lucide-react";

const MyProperties = () => {
  const { getAuthHeader } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, sold, rented, draft

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const statusParam = filter !== "all" ? `?status=${filter}` : "";
      const response = await axios.get(
        `http://localhost:8081/api/properties/user/me${statusParam}`,
        { headers: getAuthHeader() }
      );
      if (response.data.success) {
        setProperties(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8081/api/properties/${id}`,
        { headers: getAuthHeader() }
      );
      if (response.data.success) {
        alert("Property deleted successfully!");
        fetchProperties();
      }
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert("Failed to delete property");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-700",
      sold: "bg-blue-100 text-blue-700",
      rented: "bg-yellow-100 text-yellow-700",
      inactive: "bg-gray-100 text-gray-700",
      draft: "bg-purple-100 text-purple-700",
      pending: "bg-orange-100 text-orange-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Properties</h1>
          <p className="text-gray-600">{properties.length} properties listed</p>
        </div>
        <Link
          to="/seller/add-property"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Property
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "active", "sold", "rented", "draft", "inactive"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow border">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-24 h-24 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No properties found
          </h3>
          <p className="text-gray-500 mb-4">
            {filter === "all"
              ? "You haven't added any properties yet"
              : `No ${filter} properties found`}
          </p>
          <Link
            to="/seller/add-property"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Your First Property
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition"
            >
              {/* Property Image */}
              <Link to={`/property/${property._id}`}>
                {property.images && property.images[0] ? (
                  <img
                    src={property.images[0].url}
                    alt={property.description}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </Link>

              {/* Property Info */}
              <div className="p-4">
                {/* Status Badge */}
                <div className="mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {property.status}
                  </span>
                </div>

                {/* Description */}
                <Link to={`/property/${property._id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 line-clamp-2">
                    {property.description.substring(0, 80)}...
                  </h3>
                </Link>

                {/* Location */}
                <p className="text-sm text-gray-600 mb-2">
                  {property.location.area}, {property.location.city}
                </p>

                {/* Price */}
                <p className="text-xl font-bold text-blue-600 mb-3">
                  ₹
                  {property.price.display ||
                    property.price.amount.toLocaleString()}
                </p>

                {/* Metrics */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{property.metrics.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    <span>{property.metrics.favorites}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={16} />
                    <span>{property.metrics.inquiries}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/seller/edit-property/${property._id}`}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
