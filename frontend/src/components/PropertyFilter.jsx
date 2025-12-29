import { useState } from "react";
import { Search, MapPin, Home, DollarSign, Maximize2, X } from "lucide-react";

export default function PropertyFilter() {
  const [filters, setFilters] = useState({
    state: "All",
    city: "All",
    area: "All",
    type: "All",
    price: "All",
    size: "All",
  });

  const [activeFilters, setActiveFilters] = useState(0);

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    // Count active filters (excluding "All")
    const newFilters = { ...filters, [key]: value };
    const count = Object.values(newFilters).filter(
      (v) => !v.includes("All") && !v.includes("Any")
    ).length;
    setActiveFilters(count);
  };

  const clearFilters = () => {
    setFilters({
      state: "All",
      city: "All",
      area: "All",
      type: "All",
      price: "All",
      size: "All",
    });
    setActiveFilters(0);
  };

  const FilterSelect = ({ icon: Icon, label, value, options, filterKey }) => (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-neutral-600 transition-colors pointer-events-none">
        <Icon size={18} />
      </div>
      <select
        value={value}
        className="
          w-full pl-12 pr-4 py-3.5
          bg-white
          border-2 border-neutral-200
          rounded-xl
          font-medium text-neutral-700
          appearance-none
          cursor-pointer
          transition-all duration-200
          hover:border-neutral-300
          focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5
          text-sm
        "
        onChange={(e) => handleChange(filterKey, e.target.value)}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
            Find Your Property
            {activeFilters > 0 && (
              <span className="text-sm font-semibold px-2.5 py-1 bg-black text-white rounded-full">
                {activeFilters}
              </span>
            )}
          </h3>
          <p className="text-neutral-500 text-sm mt-1">
            Filter by location, type, price, and more
          </p>
        </div>
        {activeFilters > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-neutral-600 hover:text-black transition-colors flex items-center gap-1.5"
          >
            <X size={16} />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Card */}
      <div className="bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FilterSelect
            icon={MapPin}
            label="State"
            value={filters.state}
            filterKey="state"
            options={["All States", "Maharashtra", "Delhi", "Karnataka"]}
          />

          <FilterSelect
            icon={MapPin}
            label="City"
            value={filters.city}
            filterKey="city"
            options={["All Cities", "Mumbai", "Pune", "Bangalore"]}
          />

          <FilterSelect
            icon={MapPin}
            label="Area"
            value={filters.area}
            filterKey="area"
            options={["All Areas", "Andheri", "Whitefield", "Hinjewadi"]}
          />

          <FilterSelect
            icon={Home}
            label="Property Type"
            value={filters.type}
            filterKey="type"
            options={["All Types", "Villa", "Plot", "Flat", "Office", "Other"]}
          />

          <FilterSelect
            icon={DollarSign}
            label="Price Range"
            value={filters.price}
            filterKey="price"
            options={[
              "Any Price",
              "Below ₹50L",
              "₹50L – ₹1Cr",
              "₹1Cr – ₹2Cr",
              "₹2Cr+",
            ]}
          />

          <FilterSelect
            icon={Maximize2}
            label="Size"
            value={filters.size}
            filterKey="size"
            options={["Any Size", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"]}
          />
        </div>

        {/* Search Button */}
        <button
          className="
            w-full mt-6
            bg-black text-white
            py-4 rounded-xl
            font-semibold text-base
            hover:bg-neutral-800
            active:scale-[0.99]
            transition-all duration-200
            shadow-lg shadow-black/10
            flex items-center justify-center gap-2
          "
        >
          <Search size={20} />
          Search Properties
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm text-neutral-500">
        <span className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          1,234 properties available
        </span>
        <span>•</span>
        <span>Updated 2 mins ago</span>
      </div>
    </div>
  );
}