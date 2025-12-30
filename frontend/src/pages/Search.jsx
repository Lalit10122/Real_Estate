import { useState } from 'react';

import { MapPin, BedDouble, Bath, Maximize2, Heart, Share2, Eye, CheckCircle, Star, Phone, Mail } from 'lucide-react';
import PropertySearchFilter from '../components/PropertySearchFilter';

const Search = () => {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');

  // Sample property data with complete structure
  const properties = [
    {
      id: 1,
      description: "Spacious 3BHK apartment with modern amenities, excellent ventilation, and prime location near Phoenix Mall.",
      propertyType: "flat",
      listingType: "sell",
      area: {
        value: 1450,
        unit: "sqft",
      },
      price: {
        amount: 7500000,
        display: "75L",
        negotiable: true,
        pricePerSqft: 5172,
      },
      bedrooms: 3,
      bathrooms: 2,
      owner: {
        id: "user_123",
        name: "John Doe",
        phone: "+91-9876543210",
        email: "john@example.com",
        verified: true,
        type: "owner",
      },
      amenities: [
        "parking", "gym", "swimming-pool", "garden", "security",
        "power-backup", "lift", "club-house",
      ],
      features: {
        furnished: "semi-furnished",
        facing: "east",
        floorNumber: 5,
        totalFloors: 12,
        parking: {
          covered: 1,
          open: 1,
        },
        balconies: 2,
        age: "2-5 years",
        possession: "ready-to-move",
      },
      location: {
        address: "Sector 34, BKC Tower",
        area: "Vaishali Nagar",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302021",
        landmark: "Near Phoenix Mall",
        coordinates: {
          lat: 26.9124,
          lng: 75.7873,
        },
        nearby: {
          schools: ["DPS School - 1.2km", "Ryan International - 2km"],
          hospitals: ["Fortis Hospital - 3km"],
          malls: ["Phoenix Mall - 500m"],
          metro: "Mansarovar Metro - 2.5km",
        },
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          isPrimary: true,
          caption: "Living Room",
        },
      ],
      status: "active",
      availability: {
        available: true,
        availableFrom: "2024-01-01",
        immediatelyAvailable: true,
      },
      isFeatured: true,
      isVerified: true,
      isPremium: false,
      metrics: {
        views: 245,
        favorites: 45,
        inquiries: 12,
        lastViewed: "2024-12-30T10:30:00Z",
        trending: true,
      },
      seo: {
        slug: "3-bhk-luxury-flat-vaishali-nagar-jaipur",
        metaTitle: "3 BHK Luxury Flat for Sale in Vaishali Nagar",
        metaDescription: "Spacious 3BHK apartment...",
      },
      apartment: {
        societyName: "Prestige Gardens",
        towerBlock: "Tower A",
        maintenanceCharges: 3500,
        maintenanceFrequency: "monthly",
      },
    },
    {
      id: 2,
      description: "Luxurious 4BHK villa with private garden and modern amenities in a prime location.",
      propertyType: "villa",
      listingType: "sell",
      area: {
        value: 2500,
        unit: "sqft",
      },
      price: {
        amount: 12000000,
        display: "1.2Cr",
        negotiable: true,
        pricePerSqft: 4800,
      },
      bedrooms: 4,
      bathrooms: 3,
      owner: {
        id: "user_456",
        name: "Jane Smith",
        phone: "+91-9876543211",
        email: "jane@example.com",
        verified: true,
        type: "owner",
      },
      amenities: [
        "parking", "gym", "swimming-pool", "garden", "security", "power-backup",
      ],
      features: {
        furnished: "furnished",
        facing: "north",
        floorNumber: 0,
        totalFloors: 2,
        parking: {
          covered: 2,
          open: 1,
        },
        balconies: 3,
        age: "0-1 years",
        possession: "ready-to-move",
      },
      location: {
        address: "Sector 12, Green Valley",
        area: "Malviya Nagar",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302017",
        landmark: "Near City Plaza",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          isPrimary: true,
          caption: "Front View",
        },
      ],
      status: "active",
      availability: {
        available: true,
        immediatelyAvailable: true,
      },
      isFeatured: true,
      isVerified: true,
      isPremium: true,
      metrics: {
        views: 189,
        favorites: 32,
        inquiries: 8,
        trending: true,
      },
      villa: {
        floors: 2,
        servants_quarters: true,
        garden: true,
        gardenArea: "500 sqft",
      },
    },
    {
      id: 3,
      description: "Commercial plot near highway with great visibility and access.",
      propertyType: "plot",
      listingType: "sell",
      area: {
        value: 1000,
        unit: "sqft",
      },
      price: {
        amount: 4500000,
        display: "45L",
        negotiable: true,
        pricePerSqft: 4500,
      },
      bedrooms: 0,
      bathrooms: 0,
      owner: {
        id: "user_789",
        name: "Mike Johnson",
        phone: "+91-9876543212",
        email: "mike@example.com",
        verified: true,
        type: "agent",
      },
      amenities: [],
      features: {
        furnished: "unfurnished",
        facing: "south",
        age: "new",
        possession: "ready-to-move",
      },
      location: {
        address: "Near Apex Circle",
        area: "Ajmer Road",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302006",
        landmark: "Apex Circle",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          isPrimary: true,
          caption: "Plot View",
        },
      ],
      status: "active",
      availability: {
        available: true,
        immediatelyAvailable: true,
      },
      isFeatured: false,
      isVerified: true,
      metrics: {
        views: 156,
        favorites: 18,
        inquiries: 5,
      },
      plot: {
        plotNumber: "45",
        dimensions: "40x25 feet",
        boundaryWall: true,
        cornerPlot: false,
        roadWidth: "30 feet",
        facingRoad: true,
      },
    },
    {
      id: 4,
      description: "Modern 2BHK apartment in prime C-Scheme location.",
      propertyType: "flat",
      listingType: "rent",
      area: {
        value: 1200,
        unit: "sqft",
      },
      price: {
        amount: 25000,
        display: "25K/month",
        negotiable: false,
        pricePerSqft: 21,
      },
      bedrooms: 2,
      bathrooms: 2,
      owner: {
        id: "user_234",
        name: "Sarah Williams",
        phone: "+91-9876543213",
        email: "sarah@example.com",
        verified: false,
        type: "owner",
      },
      amenities: [
        "parking", "lift", "security", "power-backup",
      ],
      features: {
        furnished: "semi-furnished",
        facing: "west",
        floorNumber: 3,
        totalFloors: 8,
        parking: {
          covered: 1,
          open: 0,
        },
        balconies: 1,
        age: "5-10 years",
        possession: "ready-to-move",
      },
      location: {
        address: "Ashok Marg",
        area: "C-Scheme",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001",
        landmark: "Near Ganpati Plaza",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
          isPrimary: true,
          caption: "Living Room",
        },
      ],
      status: "active",
      availability: {
        available: true,
        availableFrom: "2025-01-15",
        immediatelyAvailable: false,
      },
      isFeatured: false,
      isVerified: false,
      metrics: {
        views: 203,
        favorites: 28,
        inquiries: 7,
      },
      apartment: {
        societyName: "Royal Residency",
        towerBlock: "B",
        maintenanceCharges: 2000,
        maintenanceFrequency: "monthly",
      },
      rental: {
        monthlyRent: 25000,
        securityDeposit: 75000,
        maintenanceIncluded: false,
        preferredTenants: "family",
        leaseDuration: "11 months minimum",
        availableFor: "longterm",
      },
    },
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img 
          src={property.images[0]?.url} 
          alt={property.seo?.metaTitle || property.description} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {property.isFeatured && (
            <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
          {property.isVerified && (
            <span className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-full flex items-center gap-1">
              <CheckCircle size={12} /> Verified
            </span>
          )}
          {property.isPremium && (
            <span className="px-3 py-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white text-xs font-semibold rounded-full">
              Premium
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-lg">
            <Heart size={18} />
          </button>
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-lg">
            <Share2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
              {property.seo?.metaTitle || property.description.substring(0, 50) + '...'}
            </h3>
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded uppercase">
              {property.propertyType}
            </span>
          </div>
          <div className="text-right ml-3">
            <div className="text-xl font-bold text-gray-900">₹{property.price.display}</div>
            {property.price.negotiable && (
              <span className="text-xs text-gray-500">Negotiable</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-4">
          <MapPin size={14} className="flex-shrink-0" />
          <span className="line-clamp-1">{property.location.address}, {property.location.area}</span>
        </div>
        
        <div className="flex gap-4 py-3 border-t border-b border-gray-200 mb-3">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <BedDouble size={16} />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <Bath size={16} />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-sm text-gray-700">
            <Maximize2 size={16} />
            <span className="font-medium">{property.area.value} {property.area.unit}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {property.features.furnished && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded capitalize">
              {property.features.furnished}
            </span>
          )}
          {property.features.possession && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded capitalize">
              {property.features.possession}
            </span>
          )}
          {property.features.facing && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded capitalize">
              {property.features.facing} facing
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{property.metrics.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>{property.metrics.favorites}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="capitalize font-medium">{property.owner.type}</span>
            {property.owner.verified && <CheckCircle size={12} />}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full max-w-[420px] lg:block hidden">
        <PropertySearchFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {properties.length} Properties
            </h1>
            <p className="text-gray-600">Found in Jaipur, Rajasthan</p>
          </div>
          <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1">
            <button 
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                viewMode === 'grid' 
                  ? 'bg-black text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button 
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                viewMode === 'list' 
                  ? 'bg-black text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Mobile Filter Toggle (Optional) */}
      <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
      </button>
    </div>
  );
};export default Search;