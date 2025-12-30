import { MapPin, Bed, Bath, Maximize2, Star, Eye } from "lucide-react";

export default function PropertyCard({
  id,
  title,
  location,
  city,
  image,
  price,
  bedrooms,
  bathrooms,
  area,
  rating,
  views,
  isFeatured = false,
  isVerified = false,
  onCardClick,
}) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-neutral-200"
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isFeatured && (
            <span className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
              Featured
            </span>
          )}
          {isVerified && (
            <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </span>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-black text-white px-4 py-2 rounded-full font-bold text-lg shadow-xl">
            ₹{price}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-black mb-2 line-clamp-1 group-hover:text-neutral-700 transition-colors">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-neutral-600 mb-4">
          <MapPin size={16} className="text-white flex-shrink-0" />
          <p className="text-sm line-clamp-1">
            {location}, {city}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200 mb-4"></div>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-black">
            <Bed size={18} className="text-neutral-500" />
            <span className="text-sm font-semibold">{bedrooms} BHK</span>
          </div>

          <div className="flex items-center gap-1.5 text-black">
            <Bath size={18} className="text-neutral-500" />
            <span className="text-sm font-semibold">{bathrooms}</span>
          </div>

          <div className="flex items-center gap-1.5 text-black">
            <Maximize2 size={18} className="text-neutral-500" />
            <span className="text-sm font-semibold">{area} sq ft</span>
          </div>
        </div>

        {/* Footer - Rating & Views */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-black">{rating}</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-500">
            <Eye size={16} />
            <span className="text-sm">{views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}