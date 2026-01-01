// const propertyData = [
//   {
//     id: 1,
//     title: "3 BHK Luxury Flat in Vaishali Nagar",
//     area: "Vaishali Nagar",
//     state: "Rajasthan",
//     city: "Jaipur",
//     location: "sector 34 , bkc tower",
//     image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
//     type: "plot",
//     price: "75L",
//     bedrooms: 3,
//     bathrooms: 2,
//     area: "1450",
//     rating: 4.5,
//     views: 245,
//     isFeatured: true,
//     isVerified: true,
//     otherDetails: "",
//   },
//   {
//     id: 2,
//     title: "3 BHK Luxury Flat in Vaishali Nagar",
//     area: "Vaishali Nagar",
//     state: "Rajasthan",
//     city: "Jaipur",
//     location: "sector 34 , bkc tower",
//     image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
//     type: "plot",
//     price: "75L",
//     bedrooms: 3,
//     bathrooms: 2,
//     area: "1450",
//     rating: 4.5,
//     views: 245,
//     isFeatured: true,
//     isVerified: true,
//     otherDetails: "",
//   },
// ];

const propertyData = [
  {
    description: "Spacious 3BHK apartment with modern amenities...",
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
    owner: {
      id: "user_123",
      name: "John Doe",
      phone: "+91-9876543210",
      email: "john@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "gym",
      "swimming-pool",
      "garden",
      "security",
      "power-backup",
      "lift",
      "club-house",
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
    // location detail/
    location: {
      address: "Sector 34, BKC Tower",
      area: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      landmark: "Near Phoenix Mall",

      // Geospatial coordinates for map
      coordinates: {
        lat: 26.9124,
        lng: 75.7873,
      },

      // Nearby places
      nearby: {
        schools: ["DPS School - 1.2km", "Ryan International - 2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
      },
    },

    // media details
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        isPrimary: true,
        caption: "Living Room",
      },
      {
        url: "https://...",
        isPrimary: false,
        caption: "Bedroom",
      },
      // ... more images
    ],
    video: {
      url: "https://youtube.com/...",
      thumbnail: "https://...",
    },

    documents: [
      {
        type: "title-deed",
        url: "https://...",
        verified: true,
      },
    ],

    // status
    status: "active", // "sold", "rented", "pending", "inactive"
    availability: {
      available: true,
      availableFrom: "2024-01-01",
      immediatelyAvailable: true,
    },

    // for featured /listings
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    featuredUntil: "2024-12-31",

    // matricis
    metrics: {
      views: 245,
      favorites: 45,
      inquiries: 12,
      lastViewed: "2024-12-30T10:30:00Z",
      trending: true,
    },

    // Timestamps & Metadata
    timestamps: {
      createdAt: "2024-11-01T00:00:00Z",
      updatedAt: "2024-12-30T00:00:00Z",
      publishedAt: "2024-11-02T00:00:00Z",
      expiresAt: "2025-12-31T23:59:59Z",
    },

    // title and description
    seo: {
      slug: "3-bhk-luxury-flat-vaishali-nagar-jaipur",
      metaTitle: "3 BHK Luxury Flat for Sale in Vaishali Nagar",
      metaDescription: "Spacious 3BHK apartment...",
    },

    // Additional Property-Specific Fields
    // For Flats/Apartments:
    apartment: {
      societyName: "Prestige Gardens",
      towerBlock: "Tower A",
      maintenanceCharges: 3500,
      maintenanceFrequency: "monthly",
    },
    // For plots
    plot: {
      plotNumber: "45",
      dimensions: "40x60 feet",
      boundaryWall: true,
      cornerPlot: false,
      roadWidth: "30 feet",
      facingRoad: true,
    },
    // For villas
    villa: {
      floors: 2,
      servants_quarters: true,
      garden: true,
      gardenArea: "500 sqft",
    },

    //  Rental-Specific Fields (if listingType: "rent")
    rental: {
      monthlyRent: 35000,
      securityDeposit: 105000, // Usually 3 months
      maintenanceIncluded: false,
      preferredTenants: "family", // "bachelor", "company"
      leaseDuration: "11 months minimum",
      availableFor: "longterm", // "shortterm"
    },
  },
   {
    description: "Spacious 3BHK apartment with modern amenities...",
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
    owner: {
      id: "user_123",
      name: "John Doe",
      phone: "+91-9876543210",
      email: "john@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "gym",
      "swimming-pool",
      "garden",
      "security",
      "power-backup",
      "lift",
      "club-house",
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
    // location detail/
    location: {
      address: "Sector 34, BKC Tower",
      area: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      landmark: "Near Phoenix Mall",

      // Geospatial coordinates for map
      coordinates: {
        lat: 26.9124,
        lng: 75.7873,
      },

      // Nearby places
      nearby: {
        schools: ["DPS School - 1.2km", "Ryan International - 2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
      },
    },

    // media details
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        isPrimary: true,
        caption: "Living Room",
      },
      {
        url: "https://...",
        isPrimary: false,
        caption: "Bedroom",
      },
      // ... more images
    ],
    video: {
      url: "https://youtube.com/...",
      thumbnail: "https://...",
    },

    documents: [
      {
        type: "title-deed",
        url: "https://...",
        verified: true,
      },
    ],

    // status
    status: "active", // "sold", "rented", "pending", "inactive"
    availability: {
      available: true,
      availableFrom: "2024-01-01",
      immediatelyAvailable: true,
    },

    // for featured /listings
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    featuredUntil: "2024-12-31",

    // matricis
    metrics: {
      views: 245,
      favorites: 45,
      inquiries: 12,
      lastViewed: "2024-12-30T10:30:00Z",
      trending: true,
    },

    // Timestamps & Metadata
    timestamps: {
      createdAt: "2024-11-01T00:00:00Z",
      updatedAt: "2024-12-30T00:00:00Z",
      publishedAt: "2024-11-02T00:00:00Z",
      expiresAt: "2025-12-31T23:59:59Z",
    },

    // title and description
    seo: {
      slug: "3-bhk-luxury-flat-vaishali-nagar-jaipur",
      metaTitle: "3 BHK Luxury Flat for Sale in Vaishali Nagar",
      metaDescription: "Spacious 3BHK apartment...",
    },

    // Additional Property-Specific Fields
    // For Flats/Apartments:
    apartment: {
      societyName: "Prestige Gardens",
      towerBlock: "Tower A",
      maintenanceCharges: 3500,
      maintenanceFrequency: "monthly",
    },
    // For plots
    plot: {
      plotNumber: "45",
      dimensions: "40x60 feet",
      boundaryWall: true,
      cornerPlot: false,
      roadWidth: "30 feet",
      facingRoad: true,
    },
    // For villas
    villa: {
      floors: 2,
      servants_quarters: true,
      garden: true,
      gardenArea: "500 sqft",
    },

    //  Rental-Specific Fields (if listingType: "rent")
    rental: {
      monthlyRent: 35000,
      securityDeposit: 105000, // Usually 3 months
      maintenanceIncluded: false,
      preferredTenants: "family", // "bachelor", "company"
      leaseDuration: "11 months minimum",
      availableFor: "longterm", // "shortterm"
    },
  },
   {
    description: "Spacious 3BHK apartment with modern amenities...",
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
    owner: {
      id: "user_123",
      name: "John Doe",
      phone: "+91-9876543210",
      email: "john@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "gym",
      "swimming-pool",
      "garden",
      "security",
      "power-backup",
      "lift",
      "club-house",
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
    // location detail/
    location: {
      address: "Sector 34, BKC Tower",
      area: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      landmark: "Near Phoenix Mall",

      // Geospatial coordinates for map
      coordinates: {
        lat: 26.9124,
        lng: 75.7873,
      },

      // Nearby places
      nearby: {
        schools: ["DPS School - 1.2km", "Ryan International - 2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
      },
    },

    // media details
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        isPrimary: true,
        caption: "Living Room",
      },
      {
        url: "https://...",
        isPrimary: false,
        caption: "Bedroom",
      },
      // ... more images
    ],
    video: {
      url: "https://youtube.com/...",
      thumbnail: "https://...",
    },

    documents: [
      {
        type: "title-deed",
        url: "https://...",
        verified: true,
      },
    ],

    // status
    status: "active", // "sold", "rented", "pending", "inactive"
    availability: {
      available: true,
      availableFrom: "2024-01-01",
      immediatelyAvailable: true,
    },

    // for featured /listings
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    featuredUntil: "2024-12-31",

    // matricis
    metrics: {
      views: 245,
      favorites: 45,
      inquiries: 12,
      lastViewed: "2024-12-30T10:30:00Z",
      trending: true,
    },

    // Timestamps & Metadata
    timestamps: {
      createdAt: "2024-11-01T00:00:00Z",
      updatedAt: "2024-12-30T00:00:00Z",
      publishedAt: "2024-11-02T00:00:00Z",
      expiresAt: "2025-12-31T23:59:59Z",
    },

    // title and description
    seo: {
      slug: "3-bhk-luxury-flat-vaishali-nagar-jaipur",
      metaTitle: "3 BHK Luxury Flat for Sale in Vaishali Nagar",
      metaDescription: "Spacious 3BHK apartment...",
    },

    // Additional Property-Specific Fields
    // For Flats/Apartments:
    apartment: {
      societyName: "Prestige Gardens",
      towerBlock: "Tower A",
      maintenanceCharges: 3500,
      maintenanceFrequency: "monthly",
    },
    // For plots
    plot: {
      plotNumber: "45",
      dimensions: "40x60 feet",
      boundaryWall: true,
      cornerPlot: false,
      roadWidth: "30 feet",
      facingRoad: true,
    },
    // For villas
    villa: {
      floors: 2,
      servants_quarters: true,
      garden: true,
      gardenArea: "500 sqft",
    },

    //  Rental-Specific Fields (if listingType: "rent")
    rental: {
      monthlyRent: 35000,
      securityDeposit: 105000, // Usually 3 months
      maintenanceIncluded: false,
      preferredTenants: "family", // "bachelor", "company"
      leaseDuration: "11 months minimum",
      availableFor: "longterm", // "shortterm"
    },
  },
   {
    description: "Spacious 3BHK apartment with modern amenities...",
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
    owner: {
      id: "user_123",
      name: "John Doe",
      phone: "+91-9876543210",
      email: "john@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "gym",
      "swimming-pool",
      "garden",
      "security",
      "power-backup", 
      "lift",
      "club-house",
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
    // location detail/
    location: {
      address: "Sector 34, BKC Tower",
      area: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      landmark: "Near Phoenix Mall",

      // Geospatial coordinates for map
      coordinates: {
        lat: 26.9124,
        lng: 75.7873,
      },

      // Nearby places
      nearby: {
        schools: ["DPS School - 1.2km", "Ryan International - 2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
      },
    },

    // media details
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        isPrimary: true,
        caption: "Living Room",
      },
      {
        url: "https://...",
        isPrimary: false,
        caption: "Bedroom",
      },
      // ... more images
    ],
    video: {
      url: "https://youtube.com/...",
      thumbnail: "https://...",
    },

    documents: [
      {
        type: "title-deed",
        url: "https://...",
        verified: true,
      },
    ],

    // status
    status: "active", // "sold", "rented", "pending", "inactive"
    availability: {
      available: true,
      availableFrom: "2024-01-01",
      immediatelyAvailable: true,
    },

    // for featured /listings
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    featuredUntil: "2024-12-31",

    // matricis
    metrics: {
      views: 245,
      favorites: 45,
      inquiries: 12,
      lastViewed: "2024-12-30T10:30:00Z",
      trending: true,
    },

    // Timestamps & Metadata
    timestamps: {
      createdAt: "2024-11-01T00:00:00Z",
      updatedAt: "2024-12-30T00:00:00Z",
      publishedAt: "2024-11-02T00:00:00Z",
      expiresAt: "2025-12-31T23:59:59Z",
    },

    // title and description
    seo: {
      slug: "3-bhk-luxury-flat-vaishali-nagar-jaipur",
      metaTitle: "3 BHK Luxury Flat for Sale in Vaishali Nagar",
      metaDescription: "Spacious 3BHK apartment...",
    },

    // Additional Property-Specific Fields
    // For Flats/Apartments:
    apartment: {
      societyName: "Prestige Gardens",
      towerBlock: "Tower A",
      maintenanceCharges: 3500,
      maintenanceFrequency: "monthly",
    },
    // For plots
    plot: {
      plotNumber: "45",
      dimensions: "40x60 feet",
      boundaryWall: true,
      cornerPlot: false,
      roadWidth: "30 feet",
      facingRoad: true,
    },
    // For villas
    villa: {
      floors: 2,
      servants_quarters: true,
      garden: true,
      gardenArea: "500 sqft",
    },

    //  Rental-Specific Fields (if listingType: "rent")
    rental: {
      monthlyRent: 35000,
      securityDeposit: 105000, // Usually 3 months
      maintenanceIncluded: false,
      preferredTenants: "family", // "bachelor", "company"
      leaseDuration: "11 months minimum",
      availableFor: "longterm", // "shortterm"
    },
  },
];

export default propertyData;
