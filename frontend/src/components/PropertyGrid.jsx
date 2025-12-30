import PropertyCard from "./PropertyCard";

export default function PropertyGrid() {
  // Example property data
  const properties = [
    {
      id: 1,
      title: "3 BHK Luxury Flat in Vaishali Nagar",
      location: "Vaishali Nagar",
      city: "Jaipur",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      price: "75L",
      bedrooms: 3,
      bathrooms: 2,
      area: "1450",
      rating: 4.5,
      views: 245,
      isFeatured: true,
      isVerified: true,
    }
  ];

  const handleCardClick = (id) => {
    console.log("Property clicked:", id);
    // Navigate to property details page or open modal
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2">
          Featured Properties
        </h2>
        <p className="text-neutral-600 text-lg">
          Discover your perfect home from our exclusive collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}