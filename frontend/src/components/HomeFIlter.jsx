import { useState } from 'react';
import { Search, MapPin, Home, DollarSign, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeFilter = () => {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState('buy'); // Set default to 'buy'
  const [isBuy, setisBuy] = useState(true)
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 
    'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow'
  ];

  const priceRanges = [
    { label: 'Under ₹50L', value: '0-5000000' },
    { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
    { label: '₹1Cr - ₹2Cr', value: '10000000-20000000' },
    { label: '₹2Cr - ₹5Cr', value: '20000000-50000000' },
    { label: '₹5Cr+', value: '50000000-1000000000' },
  ];

  const categories = ['Flat', 'Villa', 'Plot', 'Commercial'];

  // const handleSearch = () => {
  //   // Navigate to search page with filters
  //   const params = new URLSearchParams();
    
  //   if (propertyType) params.append('type', propertyType);
  //   if (location) params.append('location', location);
  //   if (priceRange) params.append('price', priceRange);
  //   if (propertyCategory) params.append('category', propertyCategory);
    
  //   navigate(`/search?${params.toString()}`);
  // };

  return (
    <div className="w-full">
      {/* Buy/Rent Toggle */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setisBuy(true)}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-200 ${
            isBuy
              ? 'bg-black text-white shadow-lg scale-[1.02]'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setisBuy(false)}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-200 ${
            !isBuy
              ? 'bg-black text-white shadow-lg scale-[1.02]'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          Rent
        </button>
      </div>

      {/* Search Form */}
      <div className="space-y-3">
        {/* Location Select */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium appearance-none cursor-pointer transition-all hover:border-gray-300 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={20} />
        </div>

        {/* Property Type Select */}
        <div className="relative">
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          <select
            value={propertyCategory}
            onChange={(e) => setPropertyCategory(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium appearance-none cursor-pointer transition-all hover:border-gray-300 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5"
          >
            <option value="">Property Type</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={20} />
        </div>

        {/* Price Range Select */}
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium appearance-none cursor-pointer transition-all hover:border-gray-300 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5"
          >
            <option value="">Budget Range</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={20} />
        </div>

        {/* Search Button */}
        <button
          // onClick={handleSearch}
          className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 mt-4"
        >
          <Search size={24} />
          Search Properties
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">1000+</div>
          <div className="text-xs text-gray-600 mt-1 font-medium">Properties</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
          <div className="text-2xl font-bold text-green-600">500+</div>
          <div className="text-xs text-gray-600 mt-1 font-medium">Happy Clients</div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;