import { useState } from 'react';

const PropertyToggles = ({ 
  igVerifiedProperty, 
  setigVerifiedProperty, 
  isFeaturedProperty, 
  setisFeaturedProperty, 
  isParking, 
  setisParking, 
  immediatelyAvailable, 
  setimmediatelyAvailable 
}) => {
  
  const toggles = [
    {
      id: 'verified',
      label: 'Verified Properties Only',
      value: igVerifiedProperty,
      setValue: setigVerifiedProperty,
    },
    {
      id: 'featured',
      label: 'Featured Properties',
      value: isFeaturedProperty,
      setValue: setisFeaturedProperty,
    },
    {
      id: 'parking',
      label: 'Parking Available',
      value: isParking,
      setValue: setisParking,
    },
    {
      id: 'immediately',
      label: 'Immediately Available',
      value: immediatelyAvailable,
      setValue: setimmediatelyAvailable,
    }
  ];

  return (
    <div className="w-full space-y-3">
      {toggles.map((toggle) => (
        <button
          key={toggle.id}
          onClick={() => toggle.setValue(!toggle.value)}
          className="w-full flex items-center justify-between px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-300 transition-colors"
        >
          {/* Label */}
          <span className="text-base font-medium text-gray-900">
            {toggle.label}
          </span>

          {/* Toggle Switch */}
          <div 
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              toggle.value 
                ? 'bg-black' 
                : 'bg-gray-300'
            }`}
          >
            <div 
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                toggle.value ? 'left-8' : 'left-1'
              }`}
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default PropertyToggles;