import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Star, 
  Eye, 
  Heart,
  Share2,
  TrendingUp,
  CheckCircle,
  Calendar,
  Building2,
  Home,
  Layers,
  Car,
  Wind,
  IndianRupee,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function PropertyCard({ property, onCardClick }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(property);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Share functionality
  };

  // Extract bedrooms from description or use property type
  const bedrooms = property.description?.match(/(\d+)BHK/)?.[1] || "3";
  
  // Get primary image
  const primaryImage = property.images?.find(img => img.isPrimary)?.url || 
                       property.images?.[0]?.url || 
                       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800";

  // Format price
  const formatPrice = (amount) => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `${(amount / 100000).toFixed(2)}L`;
    return `${(amount / 1000).toFixed(0)}K`;
  };

  // Get property title
  const getPropertyTitle = () => {
    const type = property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1);
    return `${bedrooms} BHK ${type} ${property.listingType === 'rent' ? 'for Rent' : 'for Sale'}`;
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-neutral-200 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-neutral-100">
        <img
          src={primaryImage}
          alt={getPropertyTitle()}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {property.isFeatured && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-1">
              <Star size={12} className="fill-white" />
              Featured
            </span>
          )}
          {property.isVerified && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-1">
              <CheckCircle size={12} />
              Verified
            </span>
          )}
          {property.metrics?.trending && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-1">
              <TrendingUp size={12} />
              Trending
            </span>
          )}
          {property.availability?.immediatelyAvailable && (
            <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm">
              Ready to Move
            </span>
          )}
        </div>


        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          {/* Property Type Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-neutral-800 text-xs font-bold rounded-lg shadow-md capitalize">
              {property.propertyType}
            </span>
            {property.listingType === 'rent' && (
              <span className="px-3 py-1.5 bg-purple-500 text-white text-xs font-bold rounded-lg shadow-md">
                For Rent
              </span>
            )}
          </div>

          {/* Price Tag */}
          <div className="bg-gradient-to-r from-black to-neutral-800 text-white px-4 py-2 rounded-xl font-bold shadow-xl">
            <div className="flex items-center gap-1">
              <IndianRupee size={16} />
              <span className="text-lg">{formatPrice(property.price.amount)}</span>
            </div>
            {property.price.negotiable && (
              <div className="text-[10px] text-neutral-300 font-normal text-right -mt-0.5">
                Negotiable
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-1 group-hover:text-neutral-700 transition-colors">
          {getPropertyTitle()}
        </h3>

        {/* Location */}
        <div className="flex items-start gap-2 text-neutral-600 mb-3">
          <MapPin size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="line-clamp-1 font-medium text-neutral-800">
              {property.location.area}, {property.location.city}
            </p>
            <p className="text-xs text-neutral-500 line-clamp-1">
              {property.location.landmark}
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-3 gap-3 mb-3 py-3 border-y border-neutral-200">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-neutral-700">
              <Bed size={18} className="text-blue-500" />
            </div>
            <span className="text-xs font-semibold text-neutral-900">{bedrooms} BHK</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-neutral-700">
              <Bath size={18} className="text-cyan-500" />
            </div>
            <span className="text-xs font-semibold text-neutral-900">
              {property.features?.parking?.covered || 2} Bath
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-neutral-700">
              <Maximize2 size={18} className="text-green-500" />
            </div>
            <span className="text-xs font-semibold text-neutral-900">
              {property.area.value} {property.area.unit}
            </span>
          </div>
        </div>

        {/* Additional Features */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {property.features?.furnished && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <Home size={14} className="text-orange-500" />
              <span className="capitalize font-medium">{property.features.furnished}</span>
            </div>
          )}
          {property.features?.floorNumber && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <Layers size={14} className="text-indigo-500" />
              <span className="font-medium">{property.features.floorNumber}/{property.features.totalFloors} Floor</span>
            </div>
          )}
          {property.features?.parking && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <Car size={14} className="text-purple-500" />
              <span className="font-medium">{property.features.parking.covered + property.features.parking.open} Parking</span>
            </div>
          )}
          {property.features?.facing && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <Wind size={14} className="text-teal-500" />
              <span className="capitalize font-medium">{property.features.facing}</span>
            </div>
          )}
        </div>

        {/* Amenities Tags */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-neutral-100 text-neutral-700 text-[10px] font-medium rounded-md capitalize"
              >
                {amenity.replace('-', ' ')}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-[10px] font-semibold rounded-md">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer - Metrics & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            {/* Views */}
            <div className="flex items-center gap-1">
              <Eye size={14} className="text-neutral-400" />
              <span className="text-xs font-medium text-neutral-600">
                {property.metrics?.views || 0}
              </span>
            </div>
            
            {/* Favorites */}
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-neutral-400" />
              <span className="text-xs font-medium text-neutral-600">
                {property.metrics?.favorites || 0}
              </span>
            </div>

            {/* Owner Badge */}
            {property.owner?.type === 'owner' && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-md">
                OWNER
              </span>
            )}
          </div>

          {/* View Details Button */}
          <button 
            className="flex items-center gap-1 text-xs font-bold text-black hover:gap-2 transition-all duration-200"
            onClick={handleClick}
          >
            View Details
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Rental Info (if applicable) */}
        {property.listingType === 'rent' && property.rental && (
          <div className="mt-3 pt-3 border-t border-neutral-200">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-500">Monthly Rent</span>
                <p className="font-bold text-neutral-900 flex items-center gap-0.5">
                  <IndianRupee size={12} />
                  {formatPrice(property.rental.monthlyRent)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-neutral-500">Deposit</span>
                <p className="font-bold text-neutral-900 flex items-center gap-0.5 justify-end">
                  <IndianRupee size={12} />
                  {formatPrice(property.rental.securityDeposit)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Society Name (for apartments) */}
        {property.apartment?.societyName && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-600">
            <Building2 size={14} className="text-neutral-400" />
            <span className="font-medium">{property.apartment.societyName}</span>
          </div>
        )}
      </div>
    </div>
  );
}