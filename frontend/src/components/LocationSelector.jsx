import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Search, X } from 'lucide-react';

const LocationSelector = ({ state, setstate, city, setcity, area, setarea, pinCode, setpinCode }) => {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  // Indian States and Cities Data
  const statesData = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur', 'Solapur'],
    'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga', 'Davangere'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Noida'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'],
    'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Rohtak'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kannur'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  };

  const states = Object.keys(statesData).sort();
  const cities = state ? statesData[state] || [] : [];

  // Filter states based on search
  const filteredStates = states.filter(s =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Filter cities based on search
  const filteredCities = cities.filter(c =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  // Reset city when state changes
  useEffect(() => {
    if (state && !cities.includes(city)) {
      setcity('');
    }
  }, [state]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.state-dropdown-container')) {
        setShowStateDropdown(false);
      }
      if (!e.target.closest('.city-dropdown-container')) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStateSelect = (selectedState) => {
    setstate(selectedState);
    setShowStateDropdown(false);
    setStateSearch('');
  };

  const handleCitySelect = (selectedCity) => {
    setcity(selectedCity);
    setShowCityDropdown(false);
    setCitySearch('');
  };

  return (
    <div className="w-full space-y-3">
      {/* State Selector */}
      <div className="relative state-dropdown-container">
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          State *
        </label>
        <button
          type="button"
          onClick={() => setShowStateDropdown(!showStateDropdown)}
          className={`w-full px-4 py-2.5 bg-white border-2 rounded-lg text-sm text-left flex items-center justify-between transition-all ${showStateDropdown
              ? 'border-black ring-2 ring-black/10'
              : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span className={`truncate ${state ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              {state || 'Select State'}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {state && (
              <X
                size={16}
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setstate('');
                  setcity('');
                }}
              />
            )}
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform ${showStateDropdown ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* State Dropdown */}
        {showStateDropdown && (
          <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-64 overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options */}
            <div className="max-h-48 overflow-y-auto">
              {filteredStates.length > 0 ? (
                filteredStates.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStateSelect(s)}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${state === s
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'text-gray-700'
                      }`}
                  >
                    {s}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No states found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* City Selector */}
      <div className="relative city-dropdown-container">
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          City *
        </label>
        <button
          type="button"
          onClick={() => {
            if (state) {
              setShowCityDropdown(!showCityDropdown);
            }
          }}
          disabled={!state}
          className={`w-full px-4 py-2.5 bg-white border-2 rounded-lg text-sm text-left flex items-center justify-between transition-all ${!state
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
              : showCityDropdown
                ? 'border-black ring-2 ring-black/10'
                : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span className={`truncate ${city ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              {!state ? 'Select state first' : city || 'Select City'}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {city && (
              <X
                size={16}
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setcity('');
                }}
              />
            )}
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* City Dropdown */}
        {showCityDropdown && state && (
          <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-64 overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options */}
            <div className="max-h-48 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCitySelect(c)}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${city === c
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'text-gray-700'
                      }`}
                  >
                    {c}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No cities found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Area Input */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Area / Locality
        </label>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="e.g., Vaishali Nagar, Sector 21"
            value={area}
            onChange={(e) => setarea(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
          />
        </div>
      </div>

      {/* Pincode Input */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Pincode
        </label>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="e.g., 302021"
            value={pinCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setpinCode(value);
            }}
            maxLength={6}
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
          />
        </div>
        {pinCode && pinCode.length !== 6 && (
          <p className="mt-1 text-xs text-red-500">Pincode must be 6 digits</p>
        )}
      </div>

      {/* Selected Location Summary */}
      {(state || city || area || pinCode) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-700 leading-relaxed">
              {area && <span className="font-semibold">{area}</span>}
              {area && (city || state) && <span>, </span>}
              {city && <span>{city}</span>}
              {city && state && <span>, </span>}
              {state && <span>{state}</span>}
              {pinCode && <span className="ml-1">- {pinCode}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;