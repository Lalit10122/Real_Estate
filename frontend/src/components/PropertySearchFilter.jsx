import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Home, DollarSign, Maximize2, BedDouble, Bath, Calendar, X, Check } from 'lucide-react';

const PropertySearchFilter = ({ onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    propertyType: true,
    priceRange: true,
    location: true,
    bedrooms: true,
    area: false,
    amenities: false,
    features: false
  });

  const [filters, setFilters] = useState({
    propertyType: [],
    listingType: 'sell',
    priceRange: { min: '', max: '' },
    location: {
      city: '',
      area: [],
      pincode: ''
    },
    bedrooms: [],
    bathrooms: [],
    areaRange: { min: '', max: '' },
    amenities: [],
    furnished: '',
    possession: '',
    facing: [],
    verified: false,
    featured: false,
    propertyAge: '',
    parking: false,
    availability: {
      immediatelyAvailable: false
    }
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (category, value) => {
    let newFilters = { ...filters };

    if (category === 'propertyType' || category === 'bedrooms' || category === 'bathrooms' || 
        category === 'amenities' || category === 'facing' || category === 'location.area') {
      const currentArray = category.includes('.') 
        ? category.split('.').reduce((obj, key) => obj[key], newFilters)
        : newFilters[category];
      
      if (currentArray.includes(value)) {
        const updated = currentArray.filter(item => item !== value);
        if (category.includes('.')) {
          newFilters.location.area = updated;
        } else {
          newFilters[category] = updated;
        }
      } else {
        if (category.includes('.')) {
          newFilters.location.area = [...currentArray, value];
        } else {
          newFilters[category] = [...currentArray, value];
        }
      }
    } else if (category.includes('.')) {
      const keys = category.split('.');
      if (keys.length === 2) {
        newFilters[keys[0]][keys[1]] = value;
      } else if (keys.length === 3) {
        newFilters[keys[0]][keys[1]][keys[2]] = value;
      }
    } else {
      newFilters[category] = value;
    }

    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      propertyType: [],
      listingType: 'sell',
      priceRange: { min: '', max: '' },
      location: { city: '', area: [], pincode: '' },
      bedrooms: [],
      bathrooms: [],
      areaRange: { min: '', max: '' },
      amenities: [],
      furnished: '',
      possession: '',
      facing: [],
      verified: false,
      featured: false,
      propertyAge: '',
      parking: false,
      availability: { immediatelyAvailable: false }
    };
    setFilters(clearedFilters);
    onFilterChange && onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.propertyType.length) count++;
    if (filters.listingType !== 'sell') count++;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    if (filters.location.area.length) count++;
    if (filters.bedrooms.length) count++;
    if (filters.bathrooms.length) count++;
    if (filters.areaRange.min || filters.areaRange.max) count++;
    if (filters.amenities.length) count++;
    if (filters.furnished) count++;
    if (filters.possession) count++;
    if (filters.facing.length) count++;
    if (filters.verified) count++;
    if (filters.featured) count++;
    if (filters.propertyAge) count++;
    if (filters.parking) count++;
    if (filters.availability.immediatelyAvailable) count++;
    return count;
  };

  const FilterSection = ({ title, icon: Icon, section, children }) => (
    <div className="mb-4 bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <button 
        className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
        onClick={() => toggleSection(section)}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-black" />
          <span className="text-sm font-semibold text-gray-900">{title}</span>
        </div>
        {expandedSections[section] ? 
          <ChevronUp size={18} className="text-gray-600" /> : 
          <ChevronDown size={18} className="text-gray-600" />
        }
      </button>
      {expandedSections[section] && (
        <div className="px-5 pb-5 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );

  const CheckboxOption = ({ label, checked, onChange, icon }) => (
    <label className="flex items-center gap-3 px-3 py-2.5 my-1.5 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span className={`w-5 h-5 flex items-center justify-center rounded border-2 transition-all ${
        checked ? 'bg-black border-black' : 'bg-white border-gray-300'
      }`}>
        {checked && <Check size={14} className="text-white" />}
      </span>
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-medium text-gray-700 capitalize">{label}</span>
    </label>
  );

  const propertyTypes = [
    { value: 'flat', label: 'Flat/Apartment', icon: '🏢' },
    { value: 'villa', label: 'Villa', icon: '🏡' },
    { value: 'plot', label: 'Plot/Land', icon: '🏞️' },
    { value: 'commercial', label: 'Commercial', icon: '🏪' }
  ];

  const areas = [
    'Vaishali Nagar', 'Malviya Nagar', 'C-Scheme', 'Raja Park',
    'Mansarovar', 'Jagatpura', 'Ajmer Road', 'Tonk Road',
    'Sitapura', 'Sanganer'
  ];

  const amenitiesList = [
    'parking', 'gym', 'swimming-pool', 'garden', 'security',
    'power-backup', 'lift', 'club-house', 'park', 'wifi'
  ];

  return (
    <div className="h-screen w-full max-w-[420px] bg-gray-50 border-r border-gray-200 overflow-y-auto sticky top-0">
      <div className="sticky top-0 z-10 px-6 py-8 bg-white border-b border-gray-200 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Property Filters</h2>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Active Filters</span>
            <span className="px-2.5 py-1 bg-black text-white text-xs font-semibold rounded-full">
              {getActiveFilterCount()}
            </span>
          </div>
          {getActiveFilterCount() > 0 && (
            <button 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
              onClick={clearAllFilters}
            >
              <X size={14} />
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="px-6 py-5 bg-white border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <button 
            className={`px-5 py-3 text-sm font-semibold rounded-lg transition-all ${
              filters.listingType === 'sell' 
                ? 'bg-black text-white shadow-lg' 
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterChange('listingType', 'sell')}
          >
            Buy
          </button>
          <button 
            className={`px-5 py-3 text-sm font-semibold rounded-lg transition-all ${
              filters.listingType === 'rent' 
                ? 'bg-black text-white shadow-lg' 
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterChange('listingType', 'rent')}
          >
            Rent
          </button>
        </div>
      </div>

      <div className="p-6">
        <FilterSection title="Property Type" icon={Home} section="propertyType">
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(type => (
              <CheckboxOption
                key={type.value}
                label={type.label}
                icon={type.icon}
                checked={filters.propertyType.includes(type.value)}
                onChange={() => handleFilterChange('propertyType', type.value)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range (₹)" icon={DollarSign} section="priceRange">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center my-3">
            <input 
              type="number"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Min Price"
              value={filters.priceRange.min}
              onChange={(e) => handleFilterChange('priceRange.min', e.target.value)}
            />
            <span className="text-xs text-gray-500">to</span>
            <input 
              type="number"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Max Price"
              value={filters.priceRange.max}
              onChange={(e) => handleFilterChange('priceRange.max', e.target.value)}
            />
          </div>
        </FilterSection>

        <FilterSection title="Location" icon={MapPin} section="location">
          <input 
            type="text"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Search city..."
            value={filters.location.city}
            onChange={(e) => handleFilterChange('location.city', e.target.value)}
          />
          <input 
            type="text"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent mt-2"
            placeholder="Pincode"
            value={filters.location.pincode}
            onChange={(e) => handleFilterChange('location.pincode', e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-3 max-h-48 overflow-y-auto">
            {areas.map(area => (
              <span 
                key={area}
                className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all ${
                  filters.location.area.includes(area)
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleFilterChange('location.area', area)}
              >
                {area}
              </span>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Bedrooms" icon={BedDouble} section="bedrooms">
          <div className="grid grid-cols-4 gap-2">
            {['1', '2', '3', '4', '5+'].map(bed => (
              <button
                key={bed}
                className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  filters.bedrooms.includes(bed)
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleFilterChange('bedrooms', bed)}
              >
                {bed}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Bathrooms" icon={Bath} section="bathrooms">
          <div className="grid grid-cols-4 gap-2">
            {['1', '2', '3', '4+'].map(bath => (
              <button
                key={bath}
                className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  filters.bathrooms.includes(bath)
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleFilterChange('bathrooms', bath)}
              >
                {bath}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Area (sq.ft)" icon={Maximize2} section="area">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center my-3">
            <input 
              type="number"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Min Area"
              value={filters.areaRange.min}
              onChange={(e) => handleFilterChange('areaRange.min', e.target.value)}
            />
            <span className="text-xs text-gray-500">to</span>
            <input 
              type="number"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Max Area"
              value={filters.areaRange.max}
              onChange={(e) => handleFilterChange('areaRange.max', e.target.value)}
            />
          </div>
        </FilterSection>

        <FilterSection title="Amenities" icon={Home} section="amenities">
          <div className="grid grid-cols-2 gap-2">
            {amenitiesList.map(amenity => (
              <CheckboxOption
                key={amenity}
                label={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleFilterChange('amenities', amenity)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Features" icon={Calendar} section="features">
          <select 
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent my-2"
            value={filters.furnished}
            onChange={(e) => handleFilterChange('furnished', e.target.value)}
          >
            <option value="">Furnishing Status</option>
            <option value="furnished">Fully Furnished</option>
            <option value="semi-furnished">Semi Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>

          <select 
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent my-2"
            value={filters.possession}
            onChange={(e) => handleFilterChange('possession', e.target.value)}
          >
            <option value="">Possession Status</option>
            <option value="ready-to-move">Ready to Move</option>
            <option value="under-construction">Under Construction</option>
          </select>

          <select 
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent my-2"
            value={filters.propertyAge}
            onChange={(e) => handleFilterChange('propertyAge', e.target.value)}
          >
            <option value="">Property Age</option>
            <option value="0-1">0-1 Years</option>
            <option value="1-5">1-5 Years</option>
            <option value="5-10">5-10 Years</option>
            <option value="10+">10+ Years</option>
          </select>

          <div className="grid grid-cols-2 gap-2 my-3">
            {['north', 'south', 'east', 'west'].map(direction => (
              <button
                key={direction}
                className={`py-2.5 text-sm font-semibold rounded-lg transition-all capitalize ${
                  filters.facing.includes(direction)
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleFilterChange('facing', direction)}
              >
                {direction}
              </button>
            ))}
          </div>

          <div 
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer my-2 transition-all ${
              filters.verified ? 'bg-gray-100 border-2 border-black' : 'bg-white border border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterChange('verified', !filters.verified)}
          >
            <span className="text-sm font-medium text-gray-900">Verified Properties Only</span>
            <div className={`w-11 h-6 rounded-full transition-all ${filters.verified ? 'bg-black' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${filters.verified ? 'ml-6' : 'ml-1'}`}></div>
            </div>
          </div>

          <div 
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer my-2 transition-all ${
              filters.featured ? 'bg-gray-100 border-2 border-black' : 'bg-white border border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterChange('featured', !filters.featured)}
          >
            <span className="text-sm font-medium text-gray-900">Featured Properties</span>
            <div className={`w-11 h-6 rounded-full transition-all ${filters.featured ? 'bg-black' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${filters.featured ? 'ml-6' : 'ml-1'}`}></div>
            </div>
          </div>

          <div 
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer my-2 transition-all ${
              filters.parking ? 'bg-gray-100 border-2 border-black' : 'bg-white border border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterChange('parking', !filters.parking)}
          >
            <span className="text-sm font-medium text-gray-900">Parking Available</span>
            <div className={`w-11 h-6 rounded-full transition-all ${filters.parking ? 'bg-black' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${filters.parking ? 'ml-6' : 'ml-1'}`}></div>
            </div>
          </div>

          <div 
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer my-2 transition-all ${
              filters.availability.immediatelyAvailable ? 'bg-gray-100 border-2 border-black' : 'bg-white border border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterChange('availability.immediatelyAvailable', !filters.availability.immediatelyAvailable)}
          >
            <span className="text-sm font-medium text-gray-900">Immediately Available</span>
            <div className={`w-11 h-6 rounded-full transition-all ${filters.availability.immediatelyAvailable ? 'bg-black' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${filters.availability.immediatelyAvailable ? 'ml-6' : 'ml-1'}`}></div>
            </div>
          </div>
        </FilterSection>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PropertySearchFilter;