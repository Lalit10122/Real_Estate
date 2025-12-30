import { useState } from "react";
import { Search, MapPin, Home, DollarSign, Maximize2, X, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function PropertyFilter() {
  const [filters, setFilters] = useState({
    state: "All",
    city: "All",
    area: "All",
    type: "All",
    price: "All",
    size: "All",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
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

  // Desktop Filter Select (with icon inside)
  const FilterSelectDesktop = ({ icon: Icon, label, value, options, filterKey }) => (
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

  // Mobile Filter Select (with label above)
  const FilterSelectMobile = ({ icon: Icon, label, value, options, filterKey }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
        <Icon size={16} className="text-neutral-500" />
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          className="
            w-full px-4 py-3.5
            bg-white
            border-2 border-neutral-200
            rounded-xl
            font-medium text-neutral-900
            appearance-none
            cursor-pointer
            transition-all duration-200
            hover:border-neutral-300
            focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5
            text-base
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
          <ChevronDown size={20} className="text-neutral-400" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE VIEW - Bottom Sheet */}
      <div className="lg:hidden w-full">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="
                flex-1 flex items-center justify-center gap-2
                bg-black text-white
                px-4 py-3 rounded-xl
                font-semibold text-base
                active:scale-[0.98]
                transition-all duration-200
                shadow-lg shadow-black/10
              "
            >
              <SlidersHorizontal size={20} />
              Filters
              {activeFilters > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white text-black rounded-full text-sm font-bold">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Search Button */}
            <button
              className="
                flex items-center justify-center
                bg-neutral-900 text-white
                px-5 py-3 rounded-xl
                font-semibold
                active:scale-[0.98]
                transition-all duration-200
                shadow-lg shadow-black/10
              "
            >
              <Search size={20} />
            </button>
          </div>

          {/* Active Filter Pills */}
          {activeFilters > 0 && !showFilters && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
              {Object.entries(filters).map(([key, value]) => {
                if (value.includes("All") || value.includes("Any")) return null;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-1.5 bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                  >
                    {value}
                    <button
                      onClick={() => handleChange(key, key === "price" ? "Any Price" : key === "size" ? "Any Size" : "All")}
                      className="hover:bg-neutral-200 rounded-full p-0.5 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-neutral-600 hover:text-black transition-colors whitespace-nowrap px-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filter Panel - Slides up from bottom */}
        {showFilters && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-20 animate-in fade-in duration-200"
              onClick={() => setShowFilters(false)}
            />

            {/* Filter Sheet */}
            <div className="fixed inset-x-0 bottom-0 z-30 bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-hidden flex flex-col">
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  Filter Properties
                  {activeFilters > 0 && (
                    <span className="text-sm font-semibold px-2.5 py-0.5 bg-black text-white rounded-full">
                      {activeFilters}
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Filter Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="space-y-6">
                  <FilterSelectMobile
                    icon={MapPin}
                    label="State"
                    value={filters.state}
                    filterKey="state"
                    options={["All States", "Maharashtra", "Delhi", "Karnataka"]}
                  />

                  <FilterSelectMobile
                    icon={MapPin}
                    label="City"
                    value={filters.city}
                    filterKey="city"
                    options={["All Cities", "Mumbai", "Pune", "Bangalore"]}
                  />

                  <FilterSelectMobile
                    icon={MapPin}
                    label="Area"
                    value={filters.area}
                    filterKey="area"
                    options={["All Areas", "Andheri", "Whitefield", "Hinjewadi"]}
                  />

                  <FilterSelectMobile
                    icon={Home}
                    label="Property Type"
                    value={filters.type}
                    filterKey="type"
                    options={["All Types", "Villa", "Plot", "Flat", "Office", "Other"]}
                  />

                  <FilterSelectMobile
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

                  <FilterSelectMobile
                    icon={Maximize2}
                    label="Size"
                    value={filters.size}
                    filterKey="size"
                    options={["Any Size", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"]}
                  />
                </div>
              </div>

              {/* Sheet Footer - Sticky */}
              <div className="border-t border-neutral-200 px-5 py-4 bg-white">
                <div className="flex gap-3">
                  {activeFilters > 0 && (
                    <button
                      onClick={clearFilters}
                      className="
                        px-6 py-3.5 rounded-xl
                        font-semibold text-base
                        border-2 border-neutral-200
                        text-neutral-700
                        hover:bg-neutral-50
                        active:scale-[0.98]
                        transition-all duration-200
                      "
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="
                      flex-1 flex items-center justify-center gap-2
                      bg-black text-white
                      py-3.5 rounded-xl
                      font-semibold text-base
                      active:scale-[0.98]
                      transition-all duration-200
                      shadow-lg shadow-black/10
                    "
                  >
                    <Search size={20} />
                    Show Results
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    1,234 properties
                  </span>
                  <span>•</span>
                  <span>Updated 2 mins ago</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content Area - Only shown when filters are closed */}
        {!showFilters && (
          <div className="px-4 py-6">
            <div className="text-center text-neutral-500">
              <p className="text-sm">Tap "Filters" to refine your search</p>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP VIEW - Original Card Layout */}
      <div className="hidden lg:block w-full max-w-4xl mx-auto">
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
            <FilterSelectDesktop
              icon={MapPin}
              label="State"
              value={filters.state}
              filterKey="state"
              options={["All States", "Maharashtra", "Delhi", "Karnataka"]}
            />

            <FilterSelectDesktop
              icon={MapPin}
              label="City"
              value={filters.city}
              filterKey="city"
              options={["All Cities", "Mumbai", "Pune", "Bangalore"]}
            />

            <FilterSelectDesktop
              icon={MapPin}
              label="Area"
              value={filters.area}
              filterKey="area"
              options={["All Areas", "Andheri", "Whitefield", "Hinjewadi"]}
            />

            <FilterSelectDesktop
              icon={Home}
              label="Property Type"
              value={filters.type}
              filterKey="type"
              options={["All Types", "Villa", "Plot", "Flat", "Office", "Other"]}
            />

            <FilterSelectDesktop
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

            <FilterSelectDesktop
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
    </>
  );
}