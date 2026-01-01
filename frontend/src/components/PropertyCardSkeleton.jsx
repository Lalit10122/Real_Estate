import React from 'react';

const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-200 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-56 bg-gray-300"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-2"></div>

        {/* Location Skeleton */}
        <div className="flex items-start gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        {/* Features Grid Skeleton */}
        <div className="grid grid-cols-3 gap-3 mb-3 py-3 border-y border-neutral-200">
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
          </div>
        </div>

        {/* Additional Features Skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Amenities Skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
          <div className="flex gap-3">
            <div className="h-4 bg-gray-300 rounded w-8"></div>
            <div className="h-4 bg-gray-300 rounded w-8"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;