import { useState, useRef, useEffect } from 'react';
import { IndianRupee } from 'lucide-react';

const PriceRangeSlider = ({ startPriceRange, setstartPriceRange, endPriceRange, setendPriceRange }) => {
  const minPrice = 0;
  const maxPrice = 100000000; // 10 Crore
  const step = 100000; // 1 Lakh

  const [minValue, setMinValue] = useState(startPriceRange || minPrice);
  const [maxValue, setMaxValue] = useState(endPriceRange || maxPrice);
  const [isDragging, setIsDragging] = useState(null);

  const sliderRef = useRef(null);

  // Format price in Indian format
  const formatPrice = (value) => {
    if (value === 0) return '0';
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}Cr`;
    }
    if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    }
    return `${(value / 1000).toFixed(0)}K`;
  };

  // Update parent state when values change
  useEffect(() => {
    setstartPriceRange(minValue);
    setendPriceRange(maxValue);
  }, [minValue, maxValue, setstartPriceRange, setendPriceRange]);

  // Calculate percentage position
  const getPercent = (value) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  // Handle slider movement
  const handleMouseDown = (thumb) => {
    setIsDragging(thumb);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = Math.round((percent / 100) * (maxPrice - minPrice) / step) * step + minPrice;

    if (isDragging === 'min') {
      const newMin = Math.min(value, maxValue - step);
      setMinValue(Math.max(minPrice, newMin));
    } else if (isDragging === 'max') {
      const newMax = Math.max(value, minValue + step);
      setMaxValue(Math.min(maxPrice, newMax));
    }
  };

  // Touch support for mobile
  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const touch = e.touches[0];
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const value = Math.round((percent / 100) * (maxPrice - minPrice) / step) * step + minPrice;

    if (isDragging === 'min') {
      const newMin = Math.min(value, maxValue - step);
      setMinValue(Math.max(minPrice, newMin));
    } else if (isDragging === 'max') {
      const newMax = Math.max(value, minValue + step);
      setMaxValue(Math.min(maxPrice, newMax));
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, minValue, maxValue]);

  // Quick select buttons
  const quickSelects = [
    { label: 'Under 50L', min: 0, max: 5000000 },
    { label: '50L-1Cr', min: 5000000, max: 10000000 },
    { label: '1Cr-2Cr', min: 10000000, max: 20000000 },
    { label: '2Cr-5Cr', min: 20000000, max: 50000000 },
    { label: '5Cr+', min: 50000000, max: maxPrice },
  ];

  const handleQuickSelect = (min, max) => {
    setMinValue(min);
    setMaxValue(max);
  };

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <div className="w-full p-2">
      {/* Price Display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg">
          <IndianRupee size={14} className="text-gray-600" />
          <span className="text-sm font-bold text-gray-900">{formatPrice(minValue)}</span>
        </div>
        <div className="text-xs text-gray-500">to</div>
        <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg">
          <IndianRupee size={14} className="text-gray-600" />
          <span className="text-sm font-bold text-gray-900">{formatPrice(maxValue)}</span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative mb-6">
        {/* Track Background */}
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        >
          {/* Active Range */}
          <div
            className="absolute h-2 bg-black rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Min Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-3 border-black rounded-full shadow-lg cursor-grab ${
              isDragging === 'min' ? 'scale-125 cursor-grabbing' : ''
            } transition-transform hover:scale-110`}
            style={{ left: `${minPercent}%` }}
            onMouseDown={() => handleMouseDown('min')}
            onTouchStart={() => handleMouseDown('min')}
          >
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs font-semibold rounded whitespace-nowrap transition-opacity ${
              isDragging === 'min' ? 'opacity-100' : 'opacity-0'
            }`}>
              ₹{formatPrice(minValue)}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-black" />
            </div>
          </div>

          {/* Max Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-3 border-black rounded-full shadow-lg cursor-grab ${
              isDragging === 'max' ? 'scale-125 cursor-grabbing' : ''
            } transition-transform hover:scale-110`}
            style={{ left: `${maxPercent}%` }}
            onMouseDown={() => handleMouseDown('max')}
            onTouchStart={() => handleMouseDown('max')}
          >
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs font-semibold rounded whitespace-nowrap transition-opacity ${
              isDragging === 'max' ? 'opacity-100' : 'opacity-0'
            }`}>
              ₹{formatPrice(maxValue)}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex flex-wrap gap-2">
        {quickSelects.map((option, index) => (
          <button
            key={index}
            onClick={() => handleQuickSelect(option.min, option.max)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              minValue === option.min && maxValue === option.max
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Manual Input */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minValue || ''}
          onChange={(e) => {
            const value = Math.max(minPrice, Math.min(Number(e.target.value), maxValue - step));
            setMinValue(value);
          }}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxValue || ''}
          onChange={(e) => {
            const value = Math.min(maxPrice, Math.max(Number(e.target.value), minValue + step));
            setMaxValue(value);
          }}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;