import PropertyCard from "./PropertyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function PropertySlider({ propertyData }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate current index based on scroll position
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      const gap = 16; // 4 * 4px (gap-4)
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => scrollEl.removeEventListener("scroll", checkScroll);
    }
  }, []);

  // Scroll to specific card
  const scrollToCard = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      const gap = 16;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  // Scroll left/right
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Mobile Slider with Controls */}
      <div className="lg:hidden">
        {/* Slider Container */}
        <div className="relative px-4 -mx-4">
          {/* Navigation Buttons - Floating */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              aria-label="Previous property"
            >
              <ChevronLeft size={20} className="text-neutral-800" />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              aria-label="Next property"
            >
              <ChevronRight size={20} className="text-neutral-800" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {propertyData.map((property, index) => (
              <div
                key={property.id || index}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] snap-center first:ml-4 last:mr-4"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {propertyData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-black"
                  : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to property ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter & Hint */}
        <div className="flex flex-col items-center gap-1 mt-3">
          <p className="text-sm font-semibold text-neutral-700">
            {currentIndex + 1} / {propertyData.length}
          </p>
          <p className="text-xs text-neutral-500">
            Swipe or use arrows to navigate
          </p>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:block">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Featured Properties
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              {propertyData.length} properties available
            </p>
          </div>
          
          {/* View All Link */}
          <button className="text-sm font-semibold text-black hover:underline flex items-center gap-1">
            View All
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {propertyData.map((property, index) => (
            <PropertyCard key={property.id || index} property={property} />
          ))}
        </div>

        {/* Load More Button (Optional) */}
        {propertyData.length >= 8 && (
          <div className="flex justify-center mt-8">
            <button className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2">
              Load More Properties
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {propertyData.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No Properties Found
          </h3>
          <p className="text-sm text-neutral-600">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
}