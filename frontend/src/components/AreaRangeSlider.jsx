import { useState, useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';

const AreaRangeSlider = ({ startArea, setstartArea, endArea, setendArea }) => {
  const minArea = 0;
  const maxArea = 10000; // 10,000 sq ft
  const step = 100; // 100 sq ft

  const [minValue, setMinValue] = useState(startArea || minArea);
  const [maxValue, setMaxValue] = useState(endArea || maxArea);
  const [isDragging, setIsDragging] = useState(null);

  const sliderRef = useRef(null);

  // Format area
  const formatArea = (value) => {
    if (value === 0) return '0';
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  // Update parent state when values change
  useEffect(() => {
    setstartArea(minValue);
    setendArea(maxValue);
  }, [minValue, maxValue, setstartArea, setendArea]);

  // Calculate percentage position
  const getPercent = (value) => {
    return ((value - minArea) / (maxArea - minArea)) * 100;
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
    const value = Math.round((percent / 100) * (maxArea - minArea) / step) * step + minArea;

    if (isDragging === 'min') {
      const newMin = Math.min(value, maxValue - step);
      setMinValue(Math.max(minArea, newMin));
    } else if (isDragging === 'max') {
      const newMax = Math.max(value, minValue + step);
      setMaxValue(Math.min(maxArea, newMax));
    }
  };

  // Touch support for mobile
  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const touch = e.touches[0];
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const value = Math.round((percent / 100) * (maxArea - minArea) / step) * step + minArea;

    if (isDragging === 'min') {
      const newMin = Math.min(value, maxValue - step);
      setMinValue(Math.max(minArea, newMin));
    } else if (isDragging === 'max') {
      const newMax = Math.max(value, minValue + step);
      setMaxValue(Math.min(maxArea, newMax));
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
    { label: '< 500', min: 0, max: 500 },
    { label: '500-1000', min: 500, max: 1000 },
    { label: '1000-2000', min: 1000, max: 2000 },
    { label: '2000-3000', min: 2000, max: 3000 },
    { label: '3000-5000', min: 3000, max: 5000 },
    { label: '5000+', min: 5000, max: maxArea },
  ];

  const handleQuickSelect = (min, max) => {
    setMinValue(min);
    setMaxValue(max);
  };

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <div className="w-full p-2">
      {/* Area Display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
          <Maximize2 size={14} className="text-green-600" />
          <span className="text-sm font-bold text-gray-900">{formatArea(minValue)} sq ft</span>
        </div>
        <div className="text-xs text-gray-500">to</div>
        <div className="flex items-center gap-1 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
          <Maximize2 size={14} className="text-green-600" />
          <span className="text-sm font-bold text-gray-900">{formatArea(maxValue)} sq ft</span>
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
            className="absolute h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Min Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-3 border-green-600 rounded-full shadow-lg cursor-grab ${
              isDragging === 'min' ? 'scale-125 cursor-grabbing' : ''
            } transition-transform hover:scale-110`}
            style={{ left: `${minPercent}%` }}
            onMouseDown={() => handleMouseDown('min')}
            onTouchStart={() => handleMouseDown('min')}
          >
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded whitespace-nowrap transition-opacity ${
              isDragging === 'min' ? 'opacity-100' : 'opacity-0'
            }`}>
              {formatArea(minValue)} sq ft
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-green-600" />
            </div>
          </div>

          {/* Max Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-3 border-green-600 rounded-full shadow-lg cursor-grab ${
              isDragging === 'max' ? 'scale-125 cursor-grabbing' : ''
            } transition-transform hover:scale-110`}
            style={{ left: `${maxPercent}%` }}
            onMouseDown={() => handleMouseDown('max')}
            onTouchStart={() => handleMouseDown('max')}
          >
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded whitespace-nowrap transition-opacity ${
              isDragging === 'max' ? 'opacity-100' : 'opacity-0'
            }`}>
              {formatArea(maxValue)} sq ft
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-green-600" />
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
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              minValue === option.min && maxValue === option.max
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-400 hover:text-green-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Manual Input */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="relative">
          <input
            type="number"
            placeholder="Min Area"
            value={minValue || ''}
            onChange={(e) => {
              const value = Math.max(minArea, Math.min(Number(e.target.value), maxValue - step));
              setMinValue(value);
            }}
            className="w-full px-3 py-2 pr-12 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">sq ft</span>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Max Area"
            value={maxValue || ''}
            onChange={(e) => {
              const value = Math.min(maxArea, Math.max(Number(e.target.value), minValue + step));
              setMaxValue(value);
            }}
            className="w-full px-3 py-2 pr-12 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">sq ft</span>
        </div>
      </div>

      {/* Area Summary */}
      {(minValue > minArea || maxValue < maxArea) && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-xs">
            <Maximize2 size={14} className="text-green-600" />
            <span className="text-gray-700">
              Showing properties between <span className="font-bold text-green-700">{formatArea(minValue)}</span> to <span className="font-bold text-green-700">{formatArea(maxValue)}</span> square feet
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaRangeSlider;