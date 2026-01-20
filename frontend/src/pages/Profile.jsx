import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Heart,
  Settings,
  LogOut,
  Edit2,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Home,
  TrendingUp,
  Eye,
  MessageSquare,
  Package,
} from "lucide-react";

// Mock AuthContext - replace with your actual context
const AuthContext = React.createContext({
  user: null,
  isBuyer: true,
  isSeller: false,
  logout: () => {},
});

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser, isBuyer, isSeller, logout } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
    bio: "",
  });
  const [stats, setStats] = useState({
    propertiesListed: 0,
    propertiesSold: 0,
    savedProperties: 0,
    totalViews: 0,
    inquiries: 0,
  });

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      const userData = authUser || {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        location: "Jaipur, Rajasthan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        bio: isSeller
          ? "Professional real estate seller with 5+ years of experience"
          : "Looking for the perfect property in Jaipur",
        memberSince: "January 2024",
        verified: true,
        accountType: isSeller ? "Seller" : "Buyer",
      };
      setUser(userData);
      setFormData(userData);

      // Mock stats based on account type
      if (isSeller) {
        setStats({
          propertiesListed: 12,
          propertiesSold: 5,
          savedProperties: 0,
          totalViews: 2450,
          inquiries: 48,
        });
      } else {
        setStats({
          propertiesListed: 0,
          propertiesSold: 0,
          savedProperties: 8,
          totalViews: 0,
          inquiries: 3,
        });
      }

      setLoading(false);
    }, 500);
  }, [authUser, isSeller]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // In production, save to backend
    setUser(formData);
    setIsEditing(false);
    // Show success notification
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      if (logout) logout();
      navigate("/login");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 gap-6">
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={formData.avatar || user.avatar}
                  alt={user.name}
                  className="h-32 w-32 rounded-full ring-4 ring-white object-cover shadow-xl"
                />
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
                    <Camera className="text-white" size={24} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
                {user.verified && (
                  <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 ring-4 ring-white">
                    <Shield className="text-white" size={16} />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      isSeller
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.accountType}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    Member since {user.memberSince}
                  </div>
                </div>
                {user.bio && (
                  <p className="text-gray-600 text-sm max-w-2xl">{user.bio}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Save size={18} />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(user);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {isSeller ? (
            <>
              <StatCard
                icon={Home}
                label="Listed"
                value={stats.propertiesListed}
                color="blue"
              />
              <StatCard
                icon={TrendingUp}
                label="Sold"
                value={stats.propertiesSold}
                color="green"
              />
              <StatCard
                icon={Eye}
                label="Total Views"
                value={stats.totalViews}
                color="purple"
              />
              <StatCard
                icon={MessageSquare}
                label="Inquiries"
                value={stats.inquiries}
                color="orange"
              />
              <StatCard
                icon={Package}
                label="Active"
                value={stats.propertiesListed - stats.propertiesSold}
                color="indigo"
              />
            </>
          ) : (
            <>
              <StatCard
                icon={Heart}
                label="Saved"
                value={stats.savedProperties}
                color="red"
              />
              <StatCard
                icon={MessageSquare}
                label="Inquiries"
                value={stats.inquiries}
                color="blue"
              />
              <StatCard icon={Eye} label="Viewed" value={24} color="purple" />
              <StatCard icon={Bell} label="Alerts" value={5} color="yellow" />
              <StatCard
                icon={Building2}
                label="Shortlisted"
                value={3}
                color="green"
              />
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-2">
          <nav className="flex flex-wrap gap-2">
            {[
              { id: "profile", label: "Profile", icon: User },
              {
                id: "properties",
                label: isSeller ? "My Properties" : "Saved Properties",
                icon: Building2,
              },
              { id: "activity", label: "Activity", icon: TrendingUp },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User size={24} />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={User}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                  displayValue={user.name}
                />
                <InputField
                  icon={Mail}
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                  displayValue={user.email}
                />
                <InputField
                  icon={Phone}
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                  displayValue={user.phone}
                />
                <InputField
                  icon={MapPin}
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                  displayValue={user.location}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {user.bio || "No bio added yet"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 size={24} />
                  {isSeller ? "My Properties" : "Saved Properties"}
                </h2>
                {isSeller && (
                  <button
                    onClick={() => navigate("/seller/add-property")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                  >
                    <Building2 size={18} />
                    Add Property
                  </button>
                )}
              </div>
              <div className="text-center py-16">
                <div className="text-6xl mb-4">{isSeller ? "🏢" : "❤️"}</div>
                <p className="text-gray-600 text-lg mb-2">
                  {isSeller
                    ? "No properties listed yet"
                    : "No saved properties"}
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  {isSeller
                    ? "Start listing your properties to reach potential buyers"
                    : "Start exploring properties and save your favorites"}
                </p>
                <button
                  onClick={() =>
                    navigate(isSeller ? "/seller/add-property" : "/")
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  {isSeller ? "List Your First Property" : "Browse Properties"}
                </button>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp size={24} />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Property viewed
                      </p>
                      <p className="text-sm text-gray-600">
                        2 BHK Apartment in Vaishali Nagar
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings size={24} />
                Account Settings
              </h2>

              <div className="space-y-6">
                {/* Notifications */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell size={20} />
                    Notification Preferences
                  </h3>
                  <div className="space-y-3">
                    <ToggleOption label="Email notifications" />
                    <ToggleOption label="SMS alerts for inquiries" />
                    <ToggleOption label="Price drop alerts" />
                    <ToggleOption label="New property matches" />
                  </div>
                </div>

                {/* Change Password */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield size={20} />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <Shield size={20} />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-red-700 mb-4">
                    Once you delete your account, there is no going back. All
                    your data will be permanently removed.
                  </p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600 hover:shadow-lg transition">
      <div
        className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-2`}
      >
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  isEditing,
  displayValue,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
      <Icon size={16} />
      {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    ) : (
      <p className="text-gray-900 py-2 px-4 bg-gray-50 rounded-lg">
        {displayValue}
      </p>
    )}
  </div>
);

const ToggleOption = ({ label }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default Profile;
