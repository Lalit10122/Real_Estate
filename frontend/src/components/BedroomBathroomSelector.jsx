  import { useState } from 'react';
import { BedDouble, Bath, Plus, Minus, Check } from 'lucide-react';

const BedroomBathroomSelector = ({ bedrooms, setBedrooms, bathrooms, setBathrooms }) => {
  // Predefined options
  const bedroomOptions = ['1', '2', '3', '4', '5', '6+'];
  const bathroomOptions = ['1', '2', '3', '4', '5+'];

  // Toggle selection
  const toggleBedroom = (value) => {
    if (bedrooms.includes(value)) {
      setBedrooms(bedrooms.filter(b => b !== value));
    } else {
      setBedrooms([...bedrooms, value]);
    }
  };

  const toggleBathroom = (value) => {
    if (bathrooms.includes(value)) {
      setBathrooms(bathrooms.filter(b => b !== value));
    } else {
      setBathrooms([...bathrooms, value]);
    }
  };

  // Custom value handlers
  const [customBedrooms, setCustomBedrooms] = useState('');
  const [customBathrooms, setCustomBathrooms] = useState('');
  const [showCustomBedroom, setShowCustomBedroom] = useState(false);
  const [showCustomBathroom, setShowCustomBathroom] = useState(false);

  const addCustomBedroom = () => {
    if (customBedrooms && !bedrooms.includes(customBedrooms)) {
      setBedrooms([...bedrooms, customBedrooms]);
      setCustomBedrooms('');
      setShowCustomBedroom(false);
    }
  };

  const addCustomBathroom = () => {
    if (customBathrooms && !bathrooms.includes(customBathrooms)) {
      setBathrooms([...bathrooms, customBathrooms]);
      setCustomBathrooms('');
      setShowCustomBathroom(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Bedrooms Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <BedDouble size={18} className="text-blue-600" />
            Bedrooms
          </label>
          {bedrooms.length > 0 && (
            <button
              onClick={() => setBedrooms([])}
              className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Bedroom Grid */}
        <div className="grid grid-cols-3 gap-4 mb-2">
          {bedroomOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleBedroom(option)}
              className={`relative px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                bedrooms.includes(option)
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:scale-105'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <BedDouble 
                  size={20} 
                  className={bedrooms.includes(option) ? 'text-white' : 'text-gray-400'}
                />
                <span>{option}</span>
              </div>
              
              {bedrooms.includes(option) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Custom Bedroom Input */}
        {!showCustomBedroom ? (
          <button
            onClick={() => setShowCustomBedroom(true)}
            className="w-full mt-2 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
          >
            <Plus size={14} />
            Add Custom
          </button>
        ) : (
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              min="1"
              placeholder="Custom bedrooms"
              value={customBedrooms}
              onChange={(e) => setCustomBedrooms(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              autoFocus
            />
            <button
              onClick={addCustomBedroom}
              className="px-4 py-2 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowCustomBedroom(false);
                setCustomBedrooms('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Selected Bedrooms Display */}
        {bedrooms.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs font-medium text-gray-600">Selected:</span>
            {bedrooms.map((bed) => (
              <span
                key={bed}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
              >
                {bed} BHK
                <button
                  onClick={() => toggleBedroom(bed)}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <Minus size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200"></div>

      {/* Bathrooms Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Bath size={18} className="text-cyan-600" />
            Bathrooms
          </label>
          {bathrooms.length > 0 && (
            <button
              onClick={() => setBathrooms([])}
              className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Bathroom Grid */}
        <div className="grid grid-cols-3 gap-4 mb-2 ">
          {bathroomOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleBathroom(option)}
              className={`relative px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                bathrooms.includes(option)
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:scale-105'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <Bath 
                  size={20} 
                  className={bathrooms.includes(option) ? 'text-white' : 'text-gray-400'}
                />
                <span>{option}</span>
              </div>
              
              {bathrooms.includes(option) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Custom Bathroom Input */}
        {!showCustomBathroom ? (
          <button
            onClick={() => setShowCustomBathroom(true)}
            className="w-full mt-2 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
          >
            <Plus size={14} />
            Add Custom
          </button>
        ) : (
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              min="1"
              placeholder="Custom bathrooms"
              value={customBathrooms}
              onChange={(e) => setCustomBathrooms(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              autoFocus
            />
            <button
              onClick={addCustomBathroom}
              className="px-4 py-2 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowCustomBathroom(false);
                setCustomBathrooms('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Selected Bathrooms Display */}
        {bathrooms.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs font-medium text-gray-600">Selected:</span>
            {bathrooms.map((bath) => (
              <span
                key={bath}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold"
              >
                {bath} Bath
                <button
                  onClick={() => toggleBathroom(bath)}
                  className="hover:bg-cyan-200 rounded-full p-0.5 transition-colors"
                >
                  <Minus size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {(bedrooms.length > 0 || bathrooms.length > 0) && (
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Selection Summary</div>
          <div className="flex flex-wrap gap-2 text-xs">
            {bedrooms.length > 0 && (
              <div className="flex items-center gap-1 text-gray-700">
                <BedDouble size={14} className="text-blue-600" />
                <span className="font-medium">{bedrooms.join(', ')} Bedroom{bedrooms.length > 1 ? 's' : ''}</span>
              </div>
            )}
            {bedrooms.length > 0 && bathrooms.length > 0 && (
              <span className="text-gray-400">•</span>
            )}
            {bathrooms.length > 0 && (
              <div className="flex items-center gap-1 text-gray-700">
                <Bath size={14} className="text-cyan-600" />
                <span className="font-medium">{bathrooms.join(', ')} Bathroom{bathrooms.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BedroomBathroomSelector;