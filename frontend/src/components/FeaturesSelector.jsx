import { useState } from 'react';
import { 
  Sofa, 
  Home, 
  Calendar, 
  Compass,
  Check,
  ChevronDown
} from 'lucide-react';

const FeaturesSelector = ({ 
  furnishingStatus, 
  setfurnishingStatus, 
  possessionStatus, 
  setpossessionStatus, 
  propertyAge, 
  setpropertyAge, 
  facingDirection, 
  setfacingDirection 
}) => {
  
  const furnishingOptions = [
    { value: 'furnished', label: 'Fully Furnished', icon: '🛋️' },
    { value: 'semi-furnished', label: 'Semi Furnished', icon: '🏠' },
    { value: 'unfurnished', label: 'Unfurnished', icon: '🔲' },
  ];

  const possessionOptions = [
    { value: 'ready-to-move', label: 'Ready to Move', icon: '✅' },
    { value: 'under-construction', label: 'Under Construction', icon: '🏗️' },
  ];

  const propertyAgeOptions = [
    { value: '0-1', label: '0-1 Years', icon: '🆕' },
    { value: '1-5', label: '1-5 Years', icon: '📅' },
    { value: '5-10', label: '5-10 Years', icon: '📆' },
    { value: '10+', label: '10+ Years', icon: '🏚️' },
  ];

  const facingOptions = [
    { value: 'north', label: 'North', icon: '⬆️', direction: 'N' },
    { value: 'south', label: 'South', icon: '⬇️', direction: 'S' },
    { value: 'east', label: 'East', icon: '➡️', direction: 'E' },
    { value: 'west', label: 'West', icon: '⬅️', direction: 'W' },
    { value: 'north-east', label: 'North East', icon: '↗️', direction: 'NE' },
    { value: 'north-west', label: 'North West', icon: '↖️', direction: 'NW' },
    { value: 'south-east', label: 'South East', icon: '↘️', direction: 'SE' },
    { value: 'south-west', label: 'South West', icon: '↙️', direction: 'SW' },
  ];

  const FeatureSection = ({ title, icon: Icon, children }) => (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="text-gray-700" />
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      </div>
      {children}
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Furnishing Status */}
      <FeatureSection title="Furnishing Status" icon={Sofa}>
        <div className="grid grid-cols-1 gap-4">
          {furnishingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setfurnishingStatus(option.value === furnishingStatus ? '' : option.value)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                furnishingStatus === option.value
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="flex-1 text-left">{option.label}</span>
              {furnishingStatus === option.value && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        {furnishingStatus && (
          <button
            onClick={() => setfurnishingStatus('')}
            className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
          >
            Clear Selection
          </button>
        )}
      </FeatureSection>

      {/* Divider */}
      <div className="h-px bg-gray-200"></div>

      {/* Possession Status */}
      <FeatureSection title="Possession Status" icon={Home}>
        <div className="grid grid-cols-2 gap-4">
          {possessionOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setpossessionStatus(option.value === possessionStatus ? '' : option.value)}
              className={`relative flex flex-col items-center gap-2 px-4 py-4 rounded-lg text-sm font-medium transition-all ${
                possessionStatus === option.value
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:scale-105'
              }`}
            >
              {possessionStatus === option.value && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <span className="text-2xl">{option.icon}</span>
              <span className="text-center leading-tight">{option.label}</span>
            </button>
          ))}
        </div>
        {possessionStatus && (
          <button
            onClick={() => setpossessionStatus('')}
            className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
          >
            Clear Selection
          </button>
        )}
      </FeatureSection>

      {/* Divider */}
      <div className="h-px bg-gray-200"></div>

      {/* Property Age */}
      <FeatureSection title="Property Age" icon={Calendar}>
        <div className="grid grid-cols-2 gap-4">
          {propertyAgeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setpropertyAge(option.value === propertyAge ? '' : option.value)}
              className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-xs font-semibold transition-all ${
                propertyAge === option.value
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400 hover:scale-105'
              }`}
            >
              {propertyAge === option.value && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}
              <span className="text-base">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        {propertyAge && (
          <button
            onClick={() => setpropertyAge('')}
            className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
          >
            Clear Selection
          </button>
        )}
      </FeatureSection>

      {/* Divider */}
      <div className="h-px bg-gray-200"></div>

      {/* Facing Direction */}
      <FeatureSection title="Facing Direction" icon={Compass}>
        <div className="grid grid-cols-4 gap-4 mb-2">
          {facingOptions.slice(0, 4).map((option) => (
            <button
              key={option.value}
              onClick={() => setfacingDirection(option.value === facingDirection ? '' : option.value)}
              className={`relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg text-xs font-bold transition-all ${
                facingDirection === option.value
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg scale-110'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-400 hover:scale-110'
              }`}
            >
              {facingDirection === option.value && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}
              <span className="text-xl">{option.icon}</span>
              <span className="text-[10px] uppercase tracking-wider">{option.direction}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {facingOptions.slice(4).map((option) => (
            <button
              key={option.value}
              onClick={() => setfacingDirection(option.value === facingDirection ? '' : option.value)}
              className={`relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg text-xs font-bold transition-all ${
                facingDirection === option.value
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg scale-110'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-400 hover:scale-110'
              }`}
            >
              {facingDirection === option.value && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}
              <span className="text-xl">{option.icon}</span>
              <span className="text-[10px] uppercase tracking-wider">{option.direction}</span>
            </button>
          ))}
        </div>
        {facingDirection && (
          <button
            onClick={() => setfacingDirection('')}
            className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
          >
            Clear Selection
          </button>
        )}
      </FeatureSection>

      {/* Summary Section */}
      {(furnishingStatus || possessionStatus || propertyAge || facingDirection) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
          <div className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Selected Features
          </div>
          <div className="space-y-2">
            {furnishingStatus && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Furnishing:</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {furnishingOptions.find(o => o.value === furnishingStatus)?.label}
                </span>
              </div>
            )}
            {possessionStatus && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Possession:</span>
                <span className="font-semibold text-gray-900">
                  {possessionOptions.find(o => o.value === possessionStatus)?.label}
                </span>
              </div>
            )}
            {propertyAge && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Age:</span>
                <span className="font-semibold text-gray-900">
                  {propertyAgeOptions.find(o => o.value === propertyAge)?.label}
                </span>
              </div>
            )}
            {facingDirection && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Facing:</span>
                <span className="font-semibold text-gray-900 capitalize flex items-center gap-1">
                  {facingOptions.find(o => o.value === facingDirection)?.icon}
                  {facingOptions.find(o => o.value === facingDirection)?.label}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesSelector;