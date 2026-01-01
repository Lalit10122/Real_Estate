import { useState } from 'react';
import { 
  Car, 
  Dumbbell, 
  Waves, 
  Flower2, 
  ShieldCheck, 
  Zap, 
  ArrowUpDown, 
  Building2, 
  Trees,
  Wifi,
  Check,
  X
} from 'lucide-react';

const AmenitiesSelector = ({ amenities, setAmenities }) => {
  // Amenities data with icons and labels
  const amenitiesList = [
    { 
      id: 'parking', 
      label: 'Parking', 
      icon: Car,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      selectedBg: 'bg-blue-600',
      hoverBorder: 'hover:border-blue-400'
    },
    { 
      id: 'gym', 
      label: 'Gym', 
      icon: Dumbbell,
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      selectedBg: 'bg-red-600',
      hoverBorder: 'hover:border-red-400'
    },
    { 
      id: 'swimming-pool', 
      label: 'Swimming Pool', 
      icon: Waves,
      color: 'cyan',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-700',
      selectedBg: 'bg-cyan-600',
      hoverBorder: 'hover:border-cyan-400'
    },
    { 
      id: 'garden', 
      label: 'Garden', 
      icon: Flower2,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      selectedBg: 'bg-green-600',
      hoverBorder: 'hover:border-green-400'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: ShieldCheck,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      selectedBg: 'bg-yellow-600',
      hoverBorder: 'hover:border-yellow-400'
    },
    { 
      id: 'power-backup', 
      label: 'Power Backup', 
      icon: Zap,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      selectedBg: 'bg-orange-600',
      hoverBorder: 'hover:border-orange-400'
    },
    { 
      id: 'lift', 
      label: 'Lift', 
      icon: ArrowUpDown,
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      selectedBg: 'bg-purple-600',
      hoverBorder: 'hover:border-purple-400'
    },
    { 
      id: 'club-house', 
      label: 'Club House', 
      icon: Building2,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      selectedBg: 'bg-indigo-600',
      hoverBorder: 'hover:border-indigo-400'
    },
    { 
      id: 'park', 
      label: 'Park', 
      icon: Trees,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      selectedBg: 'bg-emerald-600',
      hoverBorder: 'hover:border-emerald-400'
    },
    { 
      id: 'wifi', 
      label: 'WiFi', 
      icon: Wifi,
      color: 'pink',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      selectedBg: 'bg-pink-600',
      hoverBorder: 'hover:border-pink-400'
    },
  ];

  // Toggle amenity selection
  const toggleAmenity = (amenityId) => {
    if (amenities.includes(amenityId)) {
      setAmenities(amenities.filter(a => a !== amenityId));
    } else {
      setAmenities([...amenities, amenityId]);
    }
  };

  // Select all amenities
  const selectAll = () => {
    setAmenities(amenitiesList.map(a => a.id));
  };

  // Clear all amenities
  const clearAll = () => {
    setAmenities([]);
  };

  return (
    <div className="w-full">
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
         
          {amenities.length > 0 && (
            <span className="px-2 py-0.5 bg-black text-white text-xs font-bold rounded-full">
              {amenities.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {amenities.length > 0 && amenities.length < amenitiesList.length && (
            <button
              onClick={selectAll}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Select All
            </button>
          )}
          {amenities.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-2 gap-5">
        {amenitiesList.map((amenity) => {
          const isSelected = amenities.includes(amenity.id);
          const Icon = amenity.icon;

          return (
            <button
              key={amenity.id}
              onClick={() => toggleAmenity(amenity.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? `${amenity.selectedBg} border-transparent text-white shadow-lg scale-105`
                  : `${amenity.bgColor} ${amenity.borderColor} ${amenity.textColor} ${amenity.hoverBorder} hover:scale-105 hover:shadow-md`
              }`}
            >
              {/* Check Badge */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Check size={14} className={amenity.textColor} />
                </div>
              )}

              {/* Icon */}
              <div className="flex flex-col items-center gap-2">
                <Icon 
                  size={28} 
                  className={isSelected ? 'text-white' : ''}
                  strokeWidth={2}
                />
                <span className={`text-xs font-semibold text-center leading-tight ${
                  isSelected ? 'text-white' : ''
                }`}>
                  {amenity.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Amenities Pills */}
      {amenities.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-700">Selected:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenityId) => {
              const amenity = amenitiesList.find(a => a.id === amenityId);
              if (!amenity) return null;
              const Icon = amenity.icon;

              return (
                <div
                  key={amenityId}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${amenity.bgColor} ${amenity.borderColor} border rounded-full`}
                >
                  <Icon size={12} className={amenity.textColor} />
                  <span className={`text-xs font-medium ${amenity.textColor}`}>
                    {amenity.label}
                  </span>
                  <button
                    onClick={() => toggleAmenity(amenityId)}
                    className={`hover:bg-white/50 rounded-full p-0.5 transition-colors`}
                  >
                    <X size={12} className={amenity.textColor} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {amenities.length === 0 && (
        <div className="mt-4 p-4 text-center bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500">
            No amenities selected. Tap to select amenities you're looking for.
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
        <span>
          {amenities.length} of {amenitiesList.length} amenities selected
        </span>
        {amenities.length === amenitiesList.length && (
          <span className="text-green-600 font-semibold flex items-center gap-1">
            <Check size={12} />
            All selected
          </span>
        )}
      </div>
    </div>
  );
};

export default AmenitiesSelector;