const propertyData = [
  {
    id: 1,
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
      age: "2-5",
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
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        isPrimary: false,
        caption: "Modern Kitchen",
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        isPrimary: false,
        caption: "Master Bedroom",
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
      trending: true,
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
    description: "Luxurious 4BHK villa with private garden and pool",
    propertyType: "villa",
    listingType: "sell",
    area: {
      value: 3200,
      unit: "sqft",
    },
    price: {
      amount: 25000000,
      display: "2.5Cr",
      negotiable: true,
      pricePerSqft: 7812,
    },
    owner: {
      id: "user_456",
      name: "Priya Sharma",
      phone: "+91-9876543211",
      email: "priya@example.com",
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
      "club-house",
      "wifi",
    ],
    features: {
      furnished: "furnished",
      facing: "north",
      floorNumber: 0,
      totalFloors: 3,
      parking: {
        covered: 2,
        open: 2,
      },
      balconies: 4,
      age: "0-1",
      possession: "ready-to-move",
    },
    location: {
      address: "Plot 12, Royal Enclave",
      area: "Malviya Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302017",
      landmark: "Near Central Park",
      coordinates: {
        lat: 26.8467,
        lng: 75.8056,
      },
      nearby: {
        schools: ["St. Xavier's - 1km"],
        hospitals: ["Apex Hospital - 2km"],
        malls: ["World Trade Park - 3km"],
        metro: "Jawahar Circle Metro - 4km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
        isPrimary: true,
        caption: "Garden Area",
      },
      {
        url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
        isPrimary: false,
        caption: "Luxury Villa",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        isPrimary: false,
        caption: "Living Room",
      },
      {
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        isPrimary: false,
        caption: "Villa Front View",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-02-01",
      immediatelyAvailable: true,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: true,
    metrics: {
      views: 512,
      favorites: 89,
      inquiries: 23,
      trending: true,
    },
    villa: {
      floors: 3,
      servants_quarters: true,
      garden: true,
      gardenArea: "1200 sqft",
    },
  },
  {
    id: 3,
    description: "2BHK apartment for rent in prime location",
    propertyType: "flat",
    listingType: "rent",
    area: {
      value: 950,
      unit: "sqft",
    },
    price: {
      amount: 25000,
      display: "25K",
      negotiable: false,
      pricePerSqft: 26,
    },
    owner: {
      id: "user_789",
      name: "Rahul Verma",
      phone: "+91-9876543212",
      email: "rahul@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "gym",
      "security",
      "power-backup",
      "lift",
    ],
    features: {
      furnished: "semi-furnished",
      facing: "south",
      floorNumber: 3,
      totalFloors: 8,
      parking: {
        covered: 1,
        open: 0,
      },
      balconies: 1,
      age: "1-5",
      possession: "ready-to-move",
    },
    location: {
      address: "Block C, Green Heights",
      area: "C-Scheme",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      landmark: "Near Birla Mandir",
      coordinates: {
        lat: 26.9033,
        lng: 75.7873,
      },
      nearby: {
        schools: ["Modern School - 800m"],
        hospitals: ["SMS Hospital - 1.5km"],
        malls: ["Gaurav Tower - 500m"],
        metro: "Chandpole Metro - 1km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        isPrimary: true,
        caption: "Balcony View",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
        isPrimary: false,
        caption: "Dining Area",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        isPrimary: false,
        caption: "Bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
        isPrimary: false,
        caption: "Bathroom",
      },
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        isPrimary: false,
        caption: "Living Room",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-01-15",
      immediatelyAvailable: true,
    },
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    metrics: {
      views: 178,
      favorites: 34,
      inquiries: 8,
      trending: false,
    },
    apartment: {
      societyName: "Green Heights Society",
      towerBlock: "Block C",
      maintenanceCharges: 2000,
      maintenanceFrequency: "monthly",
    },
    rental: {
      monthlyRent: 25000,
      securityDeposit: 75000,
      maintenanceIncluded: true,
      preferredTenants: "family",
      leaseDuration: "11 months minimum",
      availableFor: "longterm",
    },
  },
  {
    id: 4,
    description: "Commercial plot in prime business district",
    propertyType: "plot",
    listingType: "sell",
    area: {
      value: 2400,
      unit: "sqft",
    },
    price: {
      amount: 18000000,
      display: "1.8Cr",
      negotiable: true,
      pricePerSqft: 7500,
    },
    owner: {
      id: "user_101",
      name: "Amit Patel",
      phone: "+91-9876543213",
      email: "amit@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "security",
      "power-backup",
    ],
    features: {
      furnished: "unfurnished",
      facing: "east",
      floorNumber: 0,
      totalFloors: 0,
      parking: {
        covered: 0,
        open: 3,
      },
      balconies: 0,
      age: "0-1",
      possession: "ready-to-move",
    },
    location: {
      address: "Plot 45, Sector 12",
      area: "Ajmer Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302006",
      landmark: "Near Jaipur International Airport",
      coordinates: {
        lat: 26.8242,
        lng: 75.8120,
      },
      nearby: {
        schools: ["Delhi Public School - 2km"],
        hospitals: ["CK Birla Hospital - 3km"],
        malls: ["Crystal Palm Mall - 1km"],
        metro: "Airport Metro - 2km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        isPrimary: true,
        caption: "Plot Overview",
      },
      {
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
        isPrimary: false,
        caption: "Land View",
      },
      {
        url: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800",
        isPrimary: false,
        caption: "Boundary",
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
      views: 423,
      favorites: 67,
      inquiries: 19,
      trending: true,
    },
    plot: {
      plotNumber: "45",
      dimensions: "40x60 feet",
      boundaryWall: true,
      cornerPlot: true,
      roadWidth: "60 feet",
      facingRoad: true,
    },
  },
  {
    id: 5,
    description: "Modern 1BHK apartment for bachelors",
    propertyType: "flat",
    listingType: "rent",
    area: {
      value: 650,
      unit: "sqft",
    },
    price: {
      amount: 15000,
      display: "15K",
      negotiable: true,
      pricePerSqft: 23,
    },
    owner: {
      id: "user_202",
      name: "Sanjay Kumar",
      phone: "+91-9876543214",
      email: "sanjay@example.com",
      verified: false,
      type: "agent",
    },
    amenities: [
      "parking",
      "security",
      "power-backup",
      "lift",
      "wifi",
    ],
    features: {
      furnished: "furnished",
      facing: "west",
      floorNumber: 2,
      totalFloors: 5,
      parking: {
        covered: 0,
        open: 1,
      },
      balconies: 1,
      age: "5-10",
      possession: "ready-to-move",
    },
    location: {
      address: "Apartment 203, Tech Park Residency",
      area: "Jagatpura",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302017",
      landmark: "Near Infosys Campus",
      coordinates: {
        lat: 26.8360,
        lng: 75.8648,
      },
      nearby: {
        schools: ["Seedling School - 1.5km"],
        hospitals: ["Mahatma Gandhi Hospital - 2km"],
        malls: ["Fun Cinemas Mall - 3km"],
        metro: "Not Available",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        isPrimary: true,
        caption: "Master Bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        isPrimary: false,
        caption: "Apartment Exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        isPrimary: false,
        caption: "Living Area",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        isPrimary: false,
        caption: "Interior Design",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-01-20",
      immediatelyAvailable: false,
    },
    isFeatured: false,
    isVerified: false,
    isPremium: false,
    metrics: {
      views: 92,
      favorites: 12,
      inquiries: 5,
      trending: false,
    },
    apartment: {
      societyName: "Tech Park Residency",
      towerBlock: "Block A",
      maintenanceCharges: 1500,
      maintenanceFrequency: "monthly",
    },
    rental: {
      monthlyRent: 15000,
      securityDeposit: 30000,
      maintenanceIncluded: false,
      preferredTenants: "bachelor",
      leaseDuration: "11 months minimum",
      availableFor: "longterm",
    },
  },
  {
    id: 6,
    description: "Premium 5BHK penthouse with terrace garden",
    propertyType: "flat",
    listingType: "sell",
    area: {
      value: 4500,
      unit: "sqft",
    },
    price: {
      amount: 45000000,
      display: "4.5Cr",
      negotiable: false,
      pricePerSqft: 10000,
    },
    owner: {
      id: "user_303",
      name: "Neha Malhotra",
      phone: "+91-9876543215",
      email: "neha@example.com",
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
      "wifi",
      "park",
    ],
    features: {
      furnished: "furnished",
      facing: "north-east",
      floorNumber: 15,
      totalFloors: 15,
      parking: {
        covered: 3,
        open: 1,
      },
      balconies: 5,
      age: "0-1",
      possession: "ready-to-move",
    },
    location: {
      address: "Penthouse, Sky Towers",
      area: "Raja Park",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302004",
      landmark: "Near Jaipur Railway Station",
      coordinates: {
        lat: 26.9154,
        lng: 75.7870,
      },
      nearby: {
        schools: ["Mayo College - 2km"],
        hospitals: ["Eternal Heart Care - 1km"],
        malls: ["Triton Mall - 1.5km"],
        metro: "Sindhi Camp Metro - 800m",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        isPrimary: true,
        caption: "Interior Design",
      },
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        isPrimary: false,
        caption: "Balcony View",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
        isPrimary: false,
        caption: "Dining Area",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        isPrimary: false,
        caption: "Bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
        isPrimary: false,
        caption: "Bathroom",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-03-01",
      immediatelyAvailable: false,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: true,
    metrics: {
      views: 1245,
      favorites: 234,
      inquiries: 56,
      trending: true,
    },
    apartment: {
      societyName: "Sky Towers Premium",
      towerBlock: "Tower A - Penthouse",
      maintenanceCharges: 12000,
      maintenanceFrequency: "monthly",
    },
  },
  {
    id: 7,
    description: "Affordable 2BHK flat in developing area",
    propertyType: "flat",
    listingType: "sell",
    area: {
      value: 850,
      unit: "sqft",
    },
    price: {
      amount: 3500000,
      display: "35L",
      negotiable: true,
      pricePerSqft: 4117,
    },
    owner: {
      id: "user_404",
      name: "Vikram Singh",
      phone: "+91-9876543216",
      email: "vikram@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "security",
      "power-backup",
      "lift",
    ],
    features: {
      furnished: "unfurnished",
      facing: "south-west",
      floorNumber: 1,
      totalFloors: 4,
      parking: {
        covered: 1,
        open: 0,
      },
      balconies: 1,
      age: "1-5",
      possession: "under-construction",
    },
    location: {
      address: "Flat 101, Sunrise Apartments",
      area: "Sanganer",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302029",
      landmark: "Near Sanganer Airport",
      coordinates: {
        lat: 26.8173,
        lng: 75.8070,
      },
      nearby: {
        schools: ["Maheshwari Public School - 1km"],
        hospitals: ["Sawai Man Singh Hospital - 4km"],
        malls: ["Pink Square Mall - 5km"],
        metro: "Not Available",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        isPrimary: true,
        caption: "Bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
        isPrimary: false,
        caption: "Bathroom",
      },
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        isPrimary: false,
        caption: "Living Room",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-06-01",
      immediatelyAvailable: false,
    },
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    metrics: {
      views: 156,
      favorites: 28,
      inquiries: 11,
      trending: false,
    },
    apartment: {
      societyName: "Sunrise Residency",
      towerBlock: "Block B",
      maintenanceCharges: 1800,
      maintenanceFrequency: "monthly",
    },
  },
  {
    id: 8,
    description: "Commercial office space in IT park",
    propertyType: "commercial",
    listingType: "rent",
    area: {
      value: 2000,
      unit: "sqft",
    },
    price: {
      amount: 80000,
      display: "80K",
      negotiable: true,
      pricePerSqft: 40,
    },
    owner: {
      id: "user_505",
      name: "Rajesh Agarwal",
      phone: "+91-9876543217",
      email: "rajesh@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "security",
      "power-backup",
      "lift",
      "wifi",
    ],
    features: {
      furnished: "furnished",
      facing: "north",
      floorNumber: 4,
      totalFloors: 10,
      parking: {
        covered: 5,
        open: 10,
      },
      balconies: 0,
      age: "0-1",
      possession: "ready-to-move",
    },
    location: {
      address: "4th Floor, IT Tower",
      area: "Sitapura",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302022",
      landmark: "Near RIICO Industrial Area",
      coordinates: {
        lat: 26.7808,
        lng: 75.8648,
      },
      nearby: {
        schools: ["MPS International - 3km"],
        hospitals: ["Metro MAS Hospital - 2km"],
        malls: ["Elements Mall - 8km"],
        metro: "Not Available",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        isPrimary: true,
        caption: "Commercial Building",
      },
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        isPrimary: false,
        caption: "Office Space",
      },
      {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
        isPrimary: false,
        caption: "Business Interior",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-02-01",
      immediatelyAvailable: true,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: {
      views: 334,
      favorites: 45,
      inquiries: 18,
      trending: false,
    },
    rental: {
      monthlyRent: 80000,
      securityDeposit: 240000,
      maintenanceIncluded: false,
      preferredTenants: "company",
      leaseDuration: "3 years minimum",
      availableFor: "longterm",
    },
  },
  {
    id: 9,
    description: "Spacious 3BHK independent villa with private pool",
    propertyType: "villa",
    listingType: "rent",
    area: {
      value: 2800,
      unit: "sqft",
    },
    price: {
      amount: 60000,
      display: "60K",
      negotiable: true,
      pricePerSqft: 21,
    },
    owner: {
      id: "user_606",
      name: "Divya Joshi",
      phone: "+91-9876543218",
      email: "divya@example.com",
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
      "wifi",
    ],
    features: {
      furnished: "semi-furnished",
      facing: "east",
      floorNumber: 0,
      totalFloors: 2,
      parking: {
        covered: 2,
        open: 2,
      },
      balconies: 3,
      age: "1-5",
      possession: "ready-to-move",
    },
    location: {
      address: "Villa 23, Palm Grove",
      area: "Mansarovar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302020",
      landmark: "Near JDA Approved Colony",
      coordinates: {
        lat: 26.8514,
        lng: 75.7374,
      },
      nearby: {
        schools: ["Neerja Modi School - 1km"],
        hospitals: ["Manipal Hospital - 2.5km"],
        malls: ["Elements Mall - 4km"],
        metro: "Mansarovar Metro - 1.5km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        isPrimary: true,
        caption: "Villa Front View",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        isPrimary: false,
        caption: "Private Pool",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        isPrimary: false,
        caption: "Villa Exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
        isPrimary: false,
        caption: "Garden Area",
      },
      {
        url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
        isPrimary: false,
        caption: "Luxury Villa",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-02-15",
      immediatelyAvailable: false,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: {
      views: 567,
      favorites: 98,
      inquiries: 34,
      trending: true,
    },
    villa: {
      floors: 2,
      servants_quarters: true,
      garden: true,
      gardenArea: "800 sqft",
    },
    rental: {
      monthlyRent: 60000,
      securityDeposit: 180000,
      maintenanceIncluded: false,
      preferredTenants: "family",
      leaseDuration: "11 months minimum",
      availableFor: "longterm",
    },
  },
  {
    id: 10,
    description: "Prime residential plot in gated community",
    propertyType: "plot",
    listingType: "sell",
    area: {
      value: 1800,
      unit: "sqft",
    },
    price: {
      amount: 9000000,
      display: "90L",
      negotiable: true,
      pricePerSqft: 5000,
    },
    owner: {
      id: "user_707",
      name: "Karan Mehta",
      phone: "+91-9876543219",
      email: "karan@example.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "park",
      "garden",
      "security",
      "power-backup",
    ],
    features: {
      furnished: "unfurnished",
      facing: "north-west",
      floorNumber: 0,
      totalFloors: 0,
      parking: {
        covered: 0,
        open: 2,
      },
      balconies: 0,
      age: "0-1",
      possession: "ready-to-move",
    },
    location: {
      address: "Plot 78, Royal Gardens",
      area: "Tonk Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302018",
      landmark: "Near Durgapura Railway Station",
      coordinates: {
        lat: 26.8512,
        lng: 75.8044,
      },
      nearby: {
        schools: ["St. Anselm's School - 2km"],
        hospitals: ["Jaipur Golden Hospital - 3km"],
        malls: ["Celebration Mall - 5km"],
        metro: "Durgapura Metro - 1km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        isPrimary: true,
        caption: "Plot Overview",
      },
      {
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
        isPrimary: false,
        caption: "Land View",
      },
      {
        url: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800",
        isPrimary: false,
        caption: "Boundary",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2024-01-01",
      immediatelyAvailable: true,
    },
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    metrics: {
      views: 289,
      favorites: 52,
      inquiries: 15,
      trending: false,
    },
    plot: {
      plotNumber: "78",
      dimensions: "30x60 feet",
      boundaryWall: false,
      cornerPlot: false,
      roadWidth: "40 feet",
      facingRoad: true,
    },
  },
  {
      "id": 11,
      "uniqueId": "PUN1011",
      "description": "Beautiful 3BHK bungalow apartment with premium amenities in Pune. Elegant property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "sell",
      "area": {
        "value": 3343,
        "unit": "sqft"
      },
      "price": {
        "amount": 29100815,
        "display": "\u20b9291L",
        "negotiable": true,
        "pricePerSqft": 8705,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1011",
        "name": "Sanjay Verma",
        "phone": "+91-9572574841",
        "email": "owner11@realestate.com",
        "verified": false,
        "type": "owner",
        "responseTime": "4 hours"
      },
      "amenities": [
        "security",
        "garden",
        "lift",
        "basketball-court",
        "workspace",
        "theatre",
        "playground",
        "parking",
        "solar-panels",
        "cctv",
        "swimming-pool"
      ],
      "features": {
        "bhk": 3,
        "furnished": "fully-furnished",
        "facing": "southwest",
        "floorNumber": 7,
        "totalFloors": 40,
        "parking": {
          "covered": 0,
          "open": 2
        },
        "balconies": 1,
        "age": "0-1 year",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 79, Heights",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 22.188,
          "lng": 86.9032
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": true,
          "caption": "Living Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "isPrimary": false,
          "caption": "Modern Kitchen"
        },
        {
          "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "isPrimary": false,
          "caption": "Master Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Apartment Exterior"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-03-23",
        "immediatelyAvailable": false
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 301,
        "favorites": 108,
        "inquiries": 27,
        "trending": false,
        "lastViewed": "2026-01-03T05:16:10.053545"
      },
      "apartment": {
        "societyName": "Sunteck Realty",
        "towerBlock": "Tower B",
        "maintenanceCharges": 3462,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1746048.9,
        "expectedYield": "3.59%"
      }
    },
    {
      "id": 12,
      "uniqueId": "BLR1012",
      "description": "Beautiful 3BHK villa apartment with premium amenities in Bangalore. Spacious property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "sell",
      "area": {
        "value": 2102,
        "unit": "sqft"
      },
      "price": {
        "amount": 10991358,
        "display": "\u20b9109L",
        "negotiable": true,
        "pricePerSqft": 5229,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1012",
        "name": "Priya Singh",
        "phone": "+91-9055956276",
        "email": "owner12@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "22 hours"
      },
      "amenities": [
        "landscaping",
        "lift",
        "workspace",
        "power-backup",
        "library",
        "cctv",
        "security",
        "basketball-court"
      ],
      "features": {
        "bhk": 3,
        "furnished": "semi-furnished",
        "facing": "northwest",
        "floorNumber": 4,
        "totalFloors": 31,
        "parking": {
          "covered": 1,
          "open": 2
        },
        "balconies": 2,
        "age": "2-5 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 62, Plaza",
        "area": "Whitefield",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560034",
        "landmark": "Near Educational Institute",
        "coordinates": {
          "lat": 25.8707,
          "lng": 77.1455
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": true,
          "caption": "City View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": false,
          "caption": "Modern Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Luxury Living"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-03",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 538,
        "favorites": 19,
        "inquiries": 16,
        "trending": false,
        "lastViewed": "2025-12-29T05:16:10.053650"
      },
      "apartment": {
        "societyName": "DLF Homes",
        "towerBlock": "Tower C",
        "maintenanceCharges": 8674,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 659481.48,
        "expectedYield": "5.30%"
      }
    },
    {
      "id": 13,
      "uniqueId": "KOL1013",
      "description": "Beautiful 4BHK bungalow apartment with premium amenities in Kolkata. Luxurious property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "rent",
      "area": {
        "value": 2510,
        "unit": "sqft"
      },
      "price": {
        "amount": 8988310,
        "display": "\u20b989L",
        "negotiable": false,
        "pricePerSqft": 3581,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1013",
        "name": "John Doe",
        "phone": "+91-9533771923",
        "email": "owner13@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "24 hours"
      },
      "amenities": [
        "library",
        "wifi",
        "workspace",
        "fire-safety",
        "waste-management",
        "gym",
        "water-harvesting",
        "club-house",
        "swimming-pool",
        "community-center",
        "solar-panels",
        "theatre",
        "tennis-court"
      ],
      "features": {
        "bhk": 4,
        "furnished": "semi-furnished",
        "facing": "northwest",
        "floorNumber": 10,
        "totalFloors": 25,
        "parking": {
          "covered": 0,
          "open": 2
        },
        "balconies": 1,
        "age": "0-1 year",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 71, Heights",
        "area": "South Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pincode": "700071",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 25.1276,
          "lng": 82.9701
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          "isPrimary": true,
          "caption": "Balcony View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
          "isPrimary": false,
          "caption": "Bedroom"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-04-13",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 255,
        "favorites": 135,
        "inquiries": 17,
        "trending": false,
        "lastViewed": "2026-01-01T05:16:10.053710"
      },
      "apartment": {
        "societyName": "Mahindra Lifespaces",
        "towerBlock": "Block 2",
        "maintenanceCharges": 2018,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 539298.6,
        "expectedYield": "7.58%"
      }
    },
    {
      "id": 14,
      "uniqueId": "JRP1014",
      "description": "Beautiful 4BHK bungalow apartment with premium amenities in Jaipur. Modern property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "sell",
      "area": {
        "value": 1520,
        "unit": "sqft"
      },
      "price": {
        "amount": 9732560,
        "display": "\u20b997L",
        "negotiable": true,
        "pricePerSqft": 6403,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1014",
        "name": "Arjun Verma",
        "phone": "+91-9944138561",
        "email": "owner14@realestate.com",
        "verified": false,
        "type": "owner",
        "responseTime": "7 hours"
      },
      "amenities": [
        "intercom",
        "basketball-court",
        "community-center",
        "club-house",
        "spa",
        "landscaping",
        "garden",
        "tennis-court",
        "waste-management",
        "swimming-pool",
        "cctv",
        "water-harvesting"
      ],
      "features": {
        "bhk": 4,
        "furnished": "semi-furnished",
        "facing": "northeast",
        "floorNumber": 17,
        "totalFloors": 19,
        "parking": {
          "covered": 1,
          "open": 2
        },
        "balconies": 4,
        "age": "1-2 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 11, Tower",
        "area": "Vaishali Nagar",
        "city": "Jaipur",
        "state": "Rajasthan",
        "pincode": "302021",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 22.9031,
          "lng": 74.0498
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": true,
          "caption": "Modern Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Luxury Living"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": false,
          "caption": "City View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Interior"
        }
      ],
      "status": "active",
      "availability": {
        "available": false,
        "availableFrom": "2026-02-22",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": false,
      "isPremium": false,
      "metrics": {
        "views": 376,
        "favorites": 75,
        "inquiries": 3,
        "trending": true,
        "lastViewed": "2025-12-14T05:16:10.053774"
      },
      "apartment": {
        "societyName": "Unitech",
        "towerBlock": "Block 2",
        "maintenanceCharges": 9691,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 583953.6,
        "expectedYield": "5.38%"
      }
    },
    {
      "id": 15,
      "uniqueId": "MUM1015",
      "description": "Beautiful 4BHK townhouse apartment with premium amenities in Mumbai. Modern property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "rent",
      "area": {
        "value": 2954,
        "unit": "sqft"
      },
      "price": {
        "amount": 26249244,
        "display": "\u20b9262L",
        "negotiable": true,
        "pricePerSqft": 8886,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1015",
        "name": "Rajesh Kumar",
        "phone": "+91-9522070614",
        "email": "owner15@realestate.com",
        "verified": false,
        "type": "owner",
        "responseTime": "5 hours"
      },
      "amenities": [
        "yoga-studio",
        "theatre",
        "spa",
        "club-house",
        "solar-panels",
        "tennis-court",
        "waste-management",
        "workspace"
      ],
      "features": {
        "bhk": 4,
        "furnished": "unfurnished",
        "facing": "southeast",
        "floorNumber": 18,
        "totalFloors": 28,
        "parking": {
          "covered": 2,
          "open": 2
        },
        "balconies": 1,
        "age": "1-2 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 62, Residency",
        "area": "Andheri",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400051",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 23.593,
          "lng": 74.8058
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": true,
          "caption": "Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1585399885289-30acddc6d0c1?w=800",
          "isPrimary": false,
          "caption": "Modern Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Space"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-03",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 193,
        "favorites": 7,
        "inquiries": 1,
        "trending": false,
        "lastViewed": "2025-12-27T05:16:10.053835"
      },
      "apartment": {
        "societyName": "Godrej Properties",
        "towerBlock": "Tower D",
        "maintenanceCharges": 2261,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1574954.64,
        "expectedYield": "5.89%"
      }
    },
    {
      "id": 16,
      "uniqueId": "PUN1016",
      "description": "Beautiful 2BHK penthouse apartment with premium amenities in Pune. Elegant property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "sell",
      "area": {
        "value": 3052,
        "unit": "sqft"
      },
      "price": {
        "amount": 23814756,
        "display": "\u20b9238L",
        "negotiable": true,
        "pricePerSqft": 7803,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1016",
        "name": "Priya Singh",
        "phone": "+91-9022880038",
        "email": "owner16@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "11 hours"
      },
      "amenities": [
        "library",
        "waste-management",
        "club-house",
        "swimming-pool",
        "lift",
        "parking",
        "playground",
        "wifi",
        "landscaping",
        "cctv",
        "workspace"
      ],
      "features": {
        "bhk": 2,
        "furnished": "semi-furnished",
        "facing": "northeast",
        "floorNumber": 16,
        "totalFloors": 14,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 2,
        "age": "2-5 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 1, Tower",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 23.3806,
          "lng": 80.4802
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": true,
          "caption": "City View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": false,
          "caption": "Modern Space"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": false,
        "availableFrom": "2026-05-03",
        "immediatelyAvailable": true
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 805,
        "favorites": 134,
        "inquiries": 8,
        "trending": true,
        "lastViewed": "2025-12-05T05:16:10.053890"
      },
      "apartment": {
        "societyName": "Puravankara",
        "towerBlock": "Block 2",
        "maintenanceCharges": 8188,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1428885.36,
        "expectedYield": "3.94%"
      }
    },
    {
      "id": 17,
      "uniqueId": "HYD1017",
      "description": "Beautiful 1BHK flat apartment with premium amenities in Hyderabad. Spacious property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "sell",
      "area": {
        "value": 3037,
        "unit": "sqft"
      },
      "price": {
        "amount": 10049433,
        "display": "\u20b9100L",
        "negotiable": true,
        "pricePerSqft": 3309,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1017",
        "name": "Pooja Nair",
        "phone": "+91-9465946053",
        "email": "owner17@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "21 hours"
      },
      "amenities": [
        "intercom",
        "workspace",
        "playground",
        "tennis-court",
        "spa",
        "yoga-studio",
        "water-harvesting",
        "security",
        "parking"
      ],
      "features": {
        "bhk": 1,
        "furnished": "fully-furnished",
        "facing": "southwest",
        "floorNumber": 14,
        "totalFloors": 18,
        "parking": {
          "covered": 0,
          "open": 2
        },
        "balconies": 3,
        "age": "0-1 year",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 89, Residency",
        "area": "Hitech City",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500081",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 21.5558,
          "lng": 84.0842
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": true,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        },
        {
          "url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
          "isPrimary": false,
          "caption": "Villa Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Garden Area"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-04",
        "immediatelyAvailable": false
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 254,
        "favorites": 114,
        "inquiries": 44,
        "trending": false,
        "lastViewed": "2025-12-09T05:16:10.053948"
      },
      "apartment": {
        "societyName": "Godrej Properties",
        "towerBlock": "Tower A",
        "maintenanceCharges": 2078,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 602965.98,
        "expectedYield": "4.99%"
      }
    },
    {
      "id": 18,
      "uniqueId": "PUN1018",
      "description": "Beautiful 2BHK townhouse apartment with premium amenities in Pune. Spacious property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "rent",
      "area": {
        "value": 2439,
        "unit": "sqft"
      },
      "price": {
        "amount": 14192541,
        "display": "\u20b9141L",
        "negotiable": true,
        "pricePerSqft": 5819,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1018",
        "name": "Rohan Sharma",
        "phone": "+91-9143428316",
        "email": "owner18@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "20 hours"
      },
      "amenities": [
        "wifi",
        "tennis-court",
        "theatre",
        "cctv",
        "solar-panels",
        "club-house",
        "yoga-studio",
        "library"
      ],
      "features": {
        "bhk": 2,
        "furnished": "unfurnished",
        "facing": "southeast",
        "floorNumber": 3,
        "totalFloors": 26,
        "parking": {
          "covered": 1,
          "open": 2
        },
        "balconies": 3,
        "age": "2-5 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 50, Plaza",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Educational Institute",
        "coordinates": {
          "lat": 26.3113,
          "lng": 86.2107
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": true,
          "caption": "Living Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1585399885289-30acddc6d0c1?w=800",
          "isPrimary": false,
          "caption": "Modern Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior"
        }
      ],
      "status": "active",
      "availability": {
        "available": false,
        "availableFrom": "2026-04-18",
        "immediatelyAvailable": false
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": true,
      "metrics": {
        "views": 634,
        "favorites": 165,
        "inquiries": 5,
        "trending": false,
        "lastViewed": "2025-12-20T05:16:10.054001"
      },
      "apartment": {
        "societyName": "DLF Homes",
        "towerBlock": "Block 2",
        "maintenanceCharges": 3944,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 851552.46,
        "expectedYield": "6.27%"
      }
    },
    {
      "id": 19,
      "uniqueId": "GGN1019",
      "description": "Beautiful 3BHK bungalow apartment with premium amenities in Gurgaon. Spacious property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "sell",
      "area": {
        "value": 1547,
        "unit": "sqft"
      },
      "price": {
        "amount": 10997623,
        "display": "\u20b9109L",
        "negotiable": false,
        "pricePerSqft": 7109,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1019",
        "name": "Sanjay Verma",
        "phone": "+91-9026013458",
        "email": "owner19@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "14 hours"
      },
      "amenities": [
        "community-center",
        "gym",
        "wifi",
        "landscaping",
        "gated-community",
        "theatre",
        "club-house",
        "garden",
        "power-backup",
        "yoga-studio",
        "tennis-court"
      ],
      "features": {
        "bhk": 3,
        "furnished": "semi-furnished",
        "facing": "north",
        "floorNumber": 10,
        "totalFloors": 36,
        "parking": {
          "covered": 2,
          "open": 2
        },
        "balconies": 1,
        "age": "2-5 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 64, Residency",
        "area": "DLF Phase 1",
        "city": "Gurgaon",
        "state": "Haryana",
        "pincode": "122001",
        "landmark": "Near Educational Institute",
        "coordinates": {
          "lat": 21.1821,
          "lng": 75.5003
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": true,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        },
        {
          "url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
          "isPrimary": false,
          "caption": "Villa Exterior"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-21",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": false,
      "isPremium": false,
      "metrics": {
        "views": 514,
        "favorites": 141,
        "inquiries": 25,
        "trending": false,
        "lastViewed": "2025-12-13T05:16:10.054055"
      },
      "apartment": {
        "societyName": "Brigade Group",
        "towerBlock": "Block 2",
        "maintenanceCharges": 9901,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 659857.38,
        "expectedYield": "4.69%"
      }
    },
    {
      "id": 20,
      "uniqueId": "KOL1020",
      "description": "Beautiful 2BHK penthouse apartment with premium amenities in Kolkata. Luxurious property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "rent",
      "area": {
        "value": 1306,
        "unit": "sqft"
      },
      "price": {
        "amount": 5819536,
        "display": "\u20b958L",
        "negotiable": true,
        "pricePerSqft": 4456,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1020",
        "name": "Neha Gupta",
        "phone": "+91-9002294574",
        "email": "owner20@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "17 hours"
      },
      "amenities": [
        "spa",
        "swimming-pool",
        "garden",
        "wifi",
        "landscaping",
        "lift",
        "gated-community",
        "waste-management",
        "club-house",
        "library"
      ],
      "features": {
        "bhk": 2,
        "furnished": "semi-furnished",
        "facing": "southeast",
        "floorNumber": 17,
        "totalFloors": 38,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 1,
        "age": "2-5 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 48, Residency",
        "area": "South Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pincode": "700071",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 22.4797,
          "lng": 77.3165
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": true,
          "caption": "City View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": false,
          "caption": "Modern Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Luxury Living"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-02",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": false,
      "isPremium": true,
      "metrics": {
        "views": 302,
        "favorites": 198,
        "inquiries": 36,
        "trending": true,
        "lastViewed": "2025-12-08T05:16:10.054108"
      },
      "apartment": {
        "societyName": "Mahindra Lifespaces",
        "towerBlock": "Block 2",
        "maintenanceCharges": 4734,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 349172.16,
        "expectedYield": "5.02%"
      }
    },
    {
      "id": 21,
      "uniqueId": "GGN1021",
      "description": "Beautiful 4BHK townhouse apartment with premium amenities in Gurgaon. Modern property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "rent",
      "area": {
        "value": 2551,
        "unit": "sqft"
      },
      "price": {
        "amount": 11022871,
        "display": "\u20b9110L",
        "negotiable": true,
        "pricePerSqft": 4321,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1021",
        "name": "Priya Singh",
        "phone": "+91-9078876645",
        "email": "owner21@realestate.com",
        "verified": false,
        "type": "owner",
        "responseTime": "18 hours"
      },
      "amenities": [
        "cctv",
        "lift",
        "theatre",
        "gym",
        "wifi",
        "swimming-pool",
        "club-house",
        "community-center",
        "playground",
        "gated-community",
        "power-backup",
        "water-harvesting",
        "spa",
        "fire-safety",
        "workspace"
      ],
      "features": {
        "bhk": 4,
        "furnished": "unfurnished",
        "facing": "southeast",
        "floorNumber": 9,
        "totalFloors": 36,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 4,
        "age": "0-1 year",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 68, Tower",
        "area": "DLF Phase 1",
        "city": "Gurgaon",
        "state": "Haryana",
        "pincode": "122001",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 25.3223,
          "lng": 81.1401
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": true,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1585399885289-30acddc6d0c1?w=800",
          "isPrimary": false,
          "caption": "Modern Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Room"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-04-15",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": false,
      "isPremium": true,
      "metrics": {
        "views": 840,
        "favorites": 168,
        "inquiries": 9,
        "trending": true,
        "lastViewed": "2025-12-09T05:16:10.054170"
      },
      "apartment": {
        "societyName": "Brigade Group",
        "towerBlock": "Block 2",
        "maintenanceCharges": 8605,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 661372.26,
        "expectedYield": "4.56%"
      }
    },
    {
      "id": 22,
      "uniqueId": "DEL1022",
      "description": "Beautiful 5BHK townhouse apartment with premium amenities in Delhi. Elegant property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "rent",
      "area": {
        "value": 1076,
        "unit": "sqft"
      },
      "price": {
        "amount": 5356328,
        "display": "\u20b953L",
        "negotiable": true,
        "pricePerSqft": 4978,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1022",
        "name": "Neha Gupta",
        "phone": "+91-9631516392",
        "email": "owner22@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "8 hours"
      },
      "amenities": [
        "security",
        "workspace",
        "power-backup",
        "community-center",
        "theatre",
        "parking",
        "intercom",
        "gym",
        "library",
        "basketball-court",
        "water-harvesting",
        "playground",
        "swimming-pool",
        "fire-safety",
        "cctv"
      ],
      "features": {
        "bhk": 5,
        "furnished": "fully-furnished",
        "facing": "east",
        "floorNumber": 8,
        "totalFloors": 40,
        "parking": {
          "covered": 0,
          "open": 2
        },
        "balconies": 1,
        "age": "10+ years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 5, Plaza",
        "area": "South Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "pincode": "110017",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 24.8357,
          "lng": 84.4932
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": true,
          "caption": "Modern Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Luxury Living"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": false,
          "caption": "City View"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-10",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 800,
        "favorites": 72,
        "inquiries": 36,
        "trending": true,
        "lastViewed": "2025-12-29T05:16:10.054224"
      },
      "apartment": {
        "societyName": "Emaar Properties",
        "towerBlock": "Tower B",
        "maintenanceCharges": 4762,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 321379.68,
        "expectedYield": "7.78%"
      }
    },
    {
      "id": 23,
      "uniqueId": "JRP1023",
      "description": "Beautiful 2BHK penthouse apartment with premium amenities in Jaipur. Elegant property with excellent location and connectivity.",
      "propertyType": "flat",
      "listingType": "sell",
      "area": {
        "value": 1024,
        "unit": "sqft"
      },
      "price": {
        "amount": 7342080,
        "display": "\u20b973L",
        "negotiable": false,
        "pricePerSqft": 7170,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1023",
        "name": "Deepika Malhotra",
        "phone": "+91-9392452879",
        "email": "owner23@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "18 hours"
      },
      "amenities": [
        "landscaping",
        "power-backup",
        "community-center",
        "library",
        "waste-management",
        "water-harvesting",
        "basketball-court",
        "intercom"
      ],
      "features": {
        "bhk": 2,
        "furnished": "fully-furnished",
        "facing": "southeast",
        "floorNumber": 5,
        "totalFloors": 25,
        "parking": {
          "covered": 1,
          "open": 0
        },
        "balconies": 1,
        "age": "5-10 years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 68, Garden",
        "area": "Vaishali Nagar",
        "city": "Jaipur",
        "state": "Rajasthan",
        "pincode": "302021",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 20.2567,
          "lng": 75.7706
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          "isPrimary": true,
          "caption": "Balcony View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
          "isPrimary": false,
          "caption": "Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
          "isPrimary": false,
          "caption": "Bathroom"
        }
      ],
      "status": "active",
      "availability": {
        "available": false,
        "availableFrom": "2026-01-20",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 432,
        "favorites": 61,
        "inquiries": 49,
        "trending": false,
        "lastViewed": "2025-12-23T05:16:10.054285"
      },
      "apartment": {
        "societyName": "Brigade Group",
        "towerBlock": "Block 2",
        "maintenanceCharges": 2089,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 440524.8,
        "expectedYield": "3.65%"
      }
    },
    {
      "id": 24,
      "uniqueId": "DEL1024",
      "description": "Beautiful 4BHK flat apartment with premium amenities in Delhi. Luxurious property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "sell",
      "area": {
        "value": 2000,
        "unit": "sqft"
      },
      "price": {
        "amount": 10952000,
        "display": "\u20b9109L",
        "negotiable": true,
        "pricePerSqft": 5476,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1024",
        "name": "Aisha Khan",
        "phone": "+91-9771215405",
        "email": "owner24@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "19 hours"
      },
      "amenities": [
        "basketball-court",
        "yoga-studio",
        "landscaping",
        "workspace",
        "lift",
        "tennis-court",
        "gym",
        "community-center",
        "wifi",
        "power-backup",
        "water-harvesting",
        "playground"
      ],
      "features": {
        "bhk": 4,
        "furnished": "unfurnished",
        "facing": "north",
        "floorNumber": 7,
        "totalFloors": 34,
        "parking": {
          "covered": 0,
          "open": 2
        },
        "balconies": 1,
        "age": "1-2 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 91, Residency",
        "area": "South Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "pincode": "110017",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 25.3953,
          "lng": 79.4681
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": true,
          "caption": "Garden Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
          "isPrimary": false,
          "caption": "Luxury Villa"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Living Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": false,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-30",
        "immediatelyAvailable": false
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 77,
        "favorites": 12,
        "inquiries": 28,
        "trending": true,
        "lastViewed": "2025-12-09T05:16:10.054339"
      },
      "apartment": {
        "societyName": "DLF Homes",
        "towerBlock": "Block 1",
        "maintenanceCharges": 3005,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 657120.0,
        "expectedYield": "5.08%"
      }
    },
    {
      "id": 25,
      "uniqueId": "DEL1025",
      "description": "Beautiful 3BHK flat apartment with premium amenities in Delhi. Spacious property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "rent",
      "area": {
        "value": 1160,
        "unit": "sqft"
      },
      "price": {
        "amount": 7946000,
        "display": "\u20b979L",
        "negotiable": true,
        "pricePerSqft": 6850,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1025",
        "name": "Sanjay Verma",
        "phone": "+91-9246135694",
        "email": "owner25@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "12 hours"
      },
      "amenities": [
        "solar-panels",
        "theatre",
        "lift",
        "gated-community",
        "parking",
        "intercom",
        "waste-management",
        "cctv",
        "playground",
        "water-harvesting",
        "library"
      ],
      "features": {
        "bhk": 3,
        "furnished": "fully-furnished",
        "facing": "southwest",
        "floorNumber": 18,
        "totalFloors": 34,
        "parking": {
          "covered": 2,
          "open": 2
        },
        "balconies": 1,
        "age": "0-1 year",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 19, Tower",
        "area": "South Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "pincode": "110017",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 26.2718,
          "lng": 76.8837
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": true,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        },
        {
          "url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
          "isPrimary": false,
          "caption": "Villa Exterior"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-03-31",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 625,
        "favorites": 72,
        "inquiries": 47,
        "trending": false,
        "lastViewed": "2025-12-13T05:16:10.054393"
      },
      "apartment": {
        "societyName": "K Raheja Corp",
        "towerBlock": "Block 2",
        "maintenanceCharges": 6054,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 476760.0,
        "expectedYield": "5.40%"
      }
    },
    {
      "id": 26,
      "uniqueId": "PUN1026",
      "description": "Beautiful 5BHK bungalow apartment with premium amenities in Pune. Spacious property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "sell",
      "area": {
        "value": 1323,
        "unit": "sqft"
      },
      "price": {
        "amount": 11682090,
        "display": "\u20b9116L",
        "negotiable": false,
        "pricePerSqft": 8830,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1026",
        "name": "Rohan Sharma",
        "phone": "+91-9307644149",
        "email": "owner26@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "9 hours"
      },
      "amenities": [
        "garden",
        "power-backup",
        "gated-community",
        "tennis-court",
        "playground",
        "solar-panels",
        "yoga-studio",
        "basketball-court",
        "gym",
        "spa",
        "theatre"
      ],
      "features": {
        "bhk": 5,
        "furnished": "semi-furnished",
        "facing": "northwest",
        "floorNumber": 4,
        "totalFloors": 37,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 1,
        "age": "2-5 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 74, Residency",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Bus Terminal",
        "coordinates": {
          "lat": 20.8823,
          "lng": 77.257
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": true,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1585399885289-30acddc6d0c1?w=800",
          "isPrimary": false,
          "caption": "Modern Design"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-04-06",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 933,
        "favorites": 165,
        "inquiries": 34,
        "trending": true,
        "lastViewed": "2025-12-14T05:16:10.054445"
      },
      "apartment": {
        "societyName": "K Raheja Corp",
        "towerBlock": "Tower B",
        "maintenanceCharges": 9968,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 700925.4,
        "expectedYield": "5.63%"
      }
    },
    {
      "id": 27,
      "uniqueId": "BLR1027",
      "description": "Beautiful 5BHK flat apartment with premium amenities in Bangalore. Modern property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "sell",
      "area": {
        "value": 3469,
        "unit": "sqft"
      },
      "price": {
        "amount": 26818839,
        "display": "\u20b9268L",
        "negotiable": true,
        "pricePerSqft": 7731,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1027",
        "name": "Neha Gupta",
        "phone": "+91-9561815504",
        "email": "owner27@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "21 hours"
      },
      "amenities": [
        "water-harvesting",
        "power-backup",
        "theatre",
        "tennis-court",
        "yoga-studio",
        "gym",
        "cctv",
        "parking"
      ],
      "features": {
        "bhk": 5,
        "furnished": "semi-furnished",
        "facing": "east",
        "floorNumber": 4,
        "totalFloors": 40,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 1,
        "age": "10+ years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 59, Residency",
        "area": "Whitefield",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560034",
        "landmark": "Near Bus Terminal",
        "coordinates": {
          "lat": 23.9941,
          "lng": 87.6923
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": true,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        },
        {
          "url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
          "isPrimary": false,
          "caption": "Villa Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Garden Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
          "isPrimary": false,
          "caption": "Luxury Villa"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-03-13",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 407,
        "favorites": 93,
        "inquiries": 39,
        "trending": false,
        "lastViewed": "2025-12-31T05:16:10.054535"
      },
      "apartment": {
        "societyName": "Unitech",
        "towerBlock": "Tower A",
        "maintenanceCharges": 9104,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1609130.34,
        "expectedYield": "4.32%"
      }
    },
    {
      "id": 28,
      "uniqueId": "PUN1028",
      "description": "Beautiful 1BHK bungalow apartment with premium amenities in Pune. Elegant property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "sell",
      "area": {
        "value": 2978,
        "unit": "sqft"
      },
      "price": {
        "amount": 9714236,
        "display": "\u20b997L",
        "negotiable": false,
        "pricePerSqft": 3262,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1028",
        "name": "Aditya Rao",
        "phone": "+91-9044992570",
        "email": "owner28@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "10 hours"
      },
      "amenities": [
        "yoga-studio",
        "playground",
        "parking",
        "landscaping",
        "waste-management",
        "power-backup",
        "cctv",
        "club-house",
        "library",
        "spa",
        "fire-safety",
        "gym",
        "lift",
        "security"
      ],
      "features": {
        "bhk": 1,
        "furnished": "unfurnished",
        "facing": "southeast",
        "floorNumber": 1,
        "totalFloors": 25,
        "parking": {
          "covered": 1,
          "open": 0
        },
        "balconies": 4,
        "age": "1-2 years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 77, Heights",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 28.4899,
          "lng": 83.5614
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "isPrimary": true,
          "caption": "Modern Kitchen"
        },
        {
          "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "isPrimary": false,
          "caption": "Master Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Apartment Exterior"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-28",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 878,
        "favorites": 55,
        "inquiries": 37,
        "trending": false,
        "lastViewed": "2025-12-30T05:16:10.054612"
      },
      "apartment": {
        "societyName": "Prestige Gardens",
        "towerBlock": "Tower A",
        "maintenanceCharges": 7653,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 582854.16,
        "expectedYield": "5.17%"
      }
    },
    {
      "id": 29,
      "uniqueId": "MUM1029",
      "description": "Beautiful 4BHK townhouse apartment with premium amenities in Mumbai. Modern property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "sell",
      "area": {
        "value": 3201,
        "unit": "sqft"
      },
      "price": {
        "amount": 28079172,
        "display": "\u20b9280L",
        "negotiable": true,
        "pricePerSqft": 8772,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1029",
        "name": "Aisha Khan",
        "phone": "+91-9405909331",
        "email": "owner29@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "4 hours"
      },
      "amenities": [
        "library",
        "garden",
        "theatre",
        "community-center",
        "security",
        "club-house",
        "gated-community",
        "cctv",
        "yoga-studio",
        "playground",
        "tennis-court",
        "wifi",
        "solar-panels"
      ],
      "features": {
        "bhk": 4,
        "furnished": "unfurnished",
        "facing": "southeast",
        "floorNumber": 12,
        "totalFloors": 32,
        "parking": {
          "covered": 2,
          "open": 0
        },
        "balconies": 2,
        "age": "1-2 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 26, Residency",
        "area": "Andheri",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400051",
        "landmark": "Near Bus Terminal",
        "coordinates": {
          "lat": 24.4955,
          "lng": 84.4297
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": true,
          "caption": "Dining Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Exterior"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-18",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": true,
      "metrics": {
        "views": 446,
        "favorites": 16,
        "inquiries": 47,
        "trending": false,
        "lastViewed": "2025-12-28T05:16:10.054673"
      },
      "apartment": {
        "societyName": "Unitech",
        "towerBlock": "Tower A",
        "maintenanceCharges": 3716,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1684750.32,
        "expectedYield": "7.73%"
      }
    },
    {
      "id": 30,
      "uniqueId": "PUN1030",
      "description": "Beautiful 5BHK flat apartment with premium amenities in Pune. Spacious property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "sell",
      "area": {
        "value": 1988,
        "unit": "sqft"
      },
      "price": {
        "amount": 12291804,
        "display": "\u20b9122L",
        "negotiable": true,
        "pricePerSqft": 6183,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1030",
        "name": "Deepika Malhotra",
        "phone": "+91-9512997536",
        "email": "owner30@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "24 hours"
      },
      "amenities": [
        "gated-community",
        "spa",
        "landscaping",
        "gym",
        "yoga-studio",
        "lift",
        "solar-panels",
        "garden",
        "waste-management",
        "intercom",
        "theatre",
        "power-backup",
        "swimming-pool"
      ],
      "features": {
        "bhk": 5,
        "furnished": "semi-furnished",
        "facing": "southwest",
        "floorNumber": 13,
        "totalFloors": 30,
        "parking": {
          "covered": 1,
          "open": 2
        },
        "balconies": 1,
        "age": "2-5 years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 96, Plaza",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Educational Institute",
        "coordinates": {
          "lat": 22.3442,
          "lng": 82.0439
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": true,
          "caption": "Dining Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
          "isPrimary": false,
          "caption": "Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
          "isPrimary": false,
          "caption": "Bathroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "isPrimary": false,
          "caption": "Modern Kitchen"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-04-13",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": false,
      "isPremium": false,
      "metrics": {
        "views": 989,
        "favorites": 40,
        "inquiries": 29,
        "trending": false,
        "lastViewed": "2025-12-07T05:16:10.054728"
      },
      "apartment": {
        "societyName": "Puravankara",
        "towerBlock": "Block 1",
        "maintenanceCharges": 9036,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 737508.24,
        "expectedYield": "5.80%"
      }
    },
    {
      "id": 31,
      "uniqueId": "DEL1031",
      "description": "Beautiful 5BHK bungalow apartment with premium amenities in Delhi. Modern property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "sell",
      "area": {
        "value": 1598,
        "unit": "sqft"
      },
      "price": {
        "amount": 9289174,
        "display": "\u20b992L",
        "negotiable": true,
        "pricePerSqft": 5813,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1031",
        "name": "Deepika Malhotra",
        "phone": "+91-9695476199",
        "email": "owner31@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "14 hours"
      },
      "amenities": [
        "basketball-court",
        "cctv",
        "yoga-studio",
        "water-harvesting",
        "spa",
        "club-house",
        "gated-community",
        "lift"
      ],
      "features": {
        "bhk": 5,
        "furnished": "fully-furnished",
        "facing": "northeast",
        "floorNumber": 12,
        "totalFloors": 16,
        "parking": {
          "covered": 0,
          "open": 0
        },
        "balconies": 1,
        "age": "1-2 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 82, Garden",
        "area": "South Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "pincode": "110017",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 23.1601,
          "lng": 74.9744
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": true,
          "caption": "Living Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "isPrimary": false,
          "caption": "Modern Kitchen"
        },
        {
          "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "isPrimary": false,
          "caption": "Master Bedroom"
        }
      ],
      "status": "active",
      "availability": {
        "available": false,
        "availableFrom": "2026-02-17",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 168,
        "favorites": 137,
        "inquiries": 28,
        "trending": false,
        "lastViewed": "2025-12-13T05:16:10.054784"
      },
      "apartment": {
        "societyName": "Prestige Gardens",
        "towerBlock": "Block 2",
        "maintenanceCharges": 5042,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 557350.44,
        "expectedYield": "6.43%"
      }
    },
    {
      "id": 32,
      "uniqueId": "BLR1032",
      "description": "Beautiful 5BHK flat apartment with premium amenities in Bangalore. Luxurious property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "sell",
      "area": {
        "value": 2993,
        "unit": "sqft"
      },
      "price": {
        "amount": 14363407,
        "display": "\u20b9143L",
        "negotiable": false,
        "pricePerSqft": 4799,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1032",
        "name": "Sanjay Verma",
        "phone": "+91-9582435112",
        "email": "owner32@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "14 hours"
      },
      "amenities": [
        "yoga-studio",
        "fire-safety",
        "garden",
        "lift",
        "wifi",
        "library",
        "solar-panels",
        "swimming-pool",
        "spa",
        "security",
        "gated-community",
        "playground",
        "theatre",
        "power-backup",
        "basketball-court"
      ],
      "features": {
        "bhk": 5,
        "furnished": "unfurnished",
        "facing": "southwest",
        "floorNumber": 2,
        "totalFloors": 32,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 3,
        "age": "1-2 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 96, Residency",
        "area": "Whitefield",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560034",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 24.8908,
          "lng": 85.5295
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": true,
          "caption": "City View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": false,
          "caption": "Modern Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Luxury Living"
        }
      ],
      "status": "active",
      "availability": {
        "available": false,
        "availableFrom": "2026-02-02",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 986,
        "favorites": 54,
        "inquiries": 21,
        "trending": false,
        "lastViewed": "2025-12-10T05:16:10.054840"
      },
      "apartment": {
        "societyName": "Peninsula Land",
        "towerBlock": "Tower B",
        "maintenanceCharges": 3893,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 861804.42,
        "expectedYield": "3.50%"
      }
    },
    {
      "id": 33,
      "uniqueId": "HYD1033",
      "description": "Beautiful 2BHK townhouse apartment with premium amenities in Hyderabad. Luxurious property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "rent",
      "area": {
        "value": 3133,
        "unit": "sqft"
      },
      "price": {
        "amount": 20120126,
        "display": "\u20b9201L",
        "negotiable": true,
        "pricePerSqft": 6422,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1033",
        "name": "Sanjay Verma",
        "phone": "+91-9231151380",
        "email": "owner33@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "14 hours"
      },
      "amenities": [
        "power-backup",
        "wifi",
        "tennis-court",
        "yoga-studio",
        "gated-community",
        "garden",
        "fire-safety",
        "community-center",
        "theatre",
        "club-house",
        "workspace",
        "solar-panels",
        "landscaping"
      ],
      "features": {
        "bhk": 2,
        "furnished": "fully-furnished",
        "facing": "northeast",
        "floorNumber": 3,
        "totalFloors": 35,
        "parking": {
          "covered": 0,
          "open": 1
        },
        "balconies": 3,
        "age": "0-1 year",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 17, Plaza",
        "area": "Hitech City",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500081",
        "landmark": "Near Bus Terminal",
        "coordinates": {
          "lat": 23.757,
          "lng": 74.3425
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          "isPrimary": true,
          "caption": "Balcony View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
          "isPrimary": false,
          "caption": "Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
          "isPrimary": false,
          "caption": "Bathroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Room"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-17",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 687,
        "favorites": 41,
        "inquiries": 40,
        "trending": true,
        "lastViewed": "2025-12-06T05:16:10.054892"
      },
      "apartment": {
        "societyName": "Brigade Group",
        "towerBlock": "Block 2",
        "maintenanceCharges": 8479,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1207207.56,
        "expectedYield": "3.14%"
      }
    },
    {
      "id": 34,
      "uniqueId": "DEL1034",
      "description": "Beautiful 3BHK villa apartment with premium amenities in Delhi. Modern property with excellent location and connectivity.",
      "propertyType": "flat",
      "listingType": "rent",
      "area": {
        "value": 2835,
        "unit": "sqft"
      },
      "price": {
        "amount": 20979000,
        "display": "\u20b9209L",
        "negotiable": true,
        "pricePerSqft": 7400,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1034",
        "name": "Sanjay Verma",
        "phone": "+91-9654185522",
        "email": "owner34@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "11 hours"
      },
      "amenities": [
        "cctv",
        "yoga-studio",
        "lift",
        "water-harvesting",
        "basketball-court",
        "spa",
        "power-backup",
        "parking",
        "theatre",
        "gym",
        "solar-panels",
        "tennis-court"
      ],
      "features": {
        "bhk": 3,
        "furnished": "semi-furnished",
        "facing": "east",
        "floorNumber": 9,
        "totalFloors": 40,
        "parking": {
          "covered": 2,
          "open": 0
        },
        "balconies": 2,
        "age": "5-10 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 10, Residency",
        "area": "South Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "pincode": "110017",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 22.9581,
          "lng": 81.9949
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
          "isPrimary": true,
          "caption": "Bathroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "isPrimary": false,
          "caption": "Modern Kitchen"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-12",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": true,
      "metrics": {
        "views": 656,
        "favorites": 104,
        "inquiries": 17,
        "trending": true,
        "lastViewed": "2025-12-20T05:16:10.054948"
      },
      "apartment": {
        "societyName": "DLF Homes",
        "towerBlock": "Tower C",
        "maintenanceCharges": 5039,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1258740.0,
        "expectedYield": "4.19%"
      }
    },
    {
      "id": 35,
      "uniqueId": "MUM1035",
      "description": "Beautiful 4BHK villa apartment with premium amenities in Mumbai. Elegant property with excellent location and connectivity.",
      "propertyType": "flat",
      "listingType": "sell",
      "area": {
        "value": 2323,
        "unit": "sqft"
      },
      "price": {
        "amount": 20033552,
        "display": "\u20b9200L",
        "negotiable": false,
        "pricePerSqft": 8624,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1035",
        "name": "Arjun Verma",
        "phone": "+91-9591665916",
        "email": "owner35@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "22 hours"
      },
      "amenities": [
        "landscaping",
        "security",
        "solar-panels",
        "lift",
        "wifi",
        "basketball-court",
        "gated-community",
        "water-harvesting",
        "community-center",
        "playground",
        "waste-management",
        "yoga-studio",
        "cctv",
        "gym",
        "fire-safety"
      ],
      "features": {
        "bhk": 4,
        "furnished": "semi-furnished",
        "facing": "northeast",
        "floorNumber": 5,
        "totalFloors": 28,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 2,
        "age": "5-10 years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 66, Residency",
        "area": "Andheri",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400051",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 26.1643,
          "lng": 87.7354
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "isPrimary": true,
          "caption": "Master Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Apartment Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "isPrimary": false,
          "caption": "Living Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior Design"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-24",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 686,
        "favorites": 20,
        "inquiries": 46,
        "trending": false,
        "lastViewed": "2025-12-22T05:16:10.055001"
      },
      "apartment": {
        "societyName": "Sunteck Realty",
        "towerBlock": "Tower C",
        "maintenanceCharges": 5517,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1202013.12,
        "expectedYield": "7.89%"
      }
    },
    {
      "id": 36,
      "uniqueId": "HYD1036",
      "description": "Beautiful 5BHK townhouse apartment with premium amenities in Hyderabad. Elegant property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "sell",
      "area": {
        "value": 2162,
        "unit": "sqft"
      },
      "price": {
        "amount": 7997238,
        "display": "\u20b979L",
        "negotiable": true,
        "pricePerSqft": 3699,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1036",
        "name": "Aisha Khan",
        "phone": "+91-9426313121",
        "email": "owner36@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "6 hours"
      },
      "amenities": [
        "waste-management",
        "solar-panels",
        "playground",
        "theatre",
        "workspace",
        "lift",
        "spa",
        "club-house",
        "library",
        "fire-safety",
        "wifi",
        "power-backup",
        "garden",
        "tennis-court",
        "cctv"
      ],
      "features": {
        "bhk": 5,
        "furnished": "semi-furnished",
        "facing": "north",
        "floorNumber": 20,
        "totalFloors": 13,
        "parking": {
          "covered": 1,
          "open": 0
        },
        "balconies": 4,
        "age": "10+ years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 86, Garden",
        "area": "Hitech City",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500081",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 23.4972,
          "lng": 74.0037
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": true,
          "caption": "Garden Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
          "isPrimary": false,
          "caption": "Luxury Villa"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Living Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": false,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-04-04",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": false,
      "isPremium": false,
      "metrics": {
        "views": 437,
        "favorites": 30,
        "inquiries": 3,
        "trending": true,
        "lastViewed": "2025-12-12T05:16:10.055060"
      },
      "apartment": {
        "societyName": "Prestige Gardens",
        "towerBlock": "Tower A",
        "maintenanceCharges": 4500,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 479834.28,
        "expectedYield": "7.60%"
      }
    },
    {
      "id": 37,
      "uniqueId": "JRP1037",
      "description": "Beautiful 5BHK flat apartment with premium amenities in Jaipur. Modern property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "sell",
      "area": {
        "value": 3379,
        "unit": "sqft"
      },
      "price": {
        "amount": 27846339,
        "display": "\u20b9278L",
        "negotiable": true,
        "pricePerSqft": 8241,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1037",
        "name": "Aditya Rao",
        "phone": "+91-9900475336",
        "email": "owner37@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "14 hours"
      },
      "amenities": [
        "club-house",
        "security",
        "community-center",
        "gated-community",
        "library",
        "landscaping",
        "wifi",
        "yoga-studio",
        "workspace",
        "fire-safety",
        "playground"
      ],
      "features": {
        "bhk": 5,
        "furnished": "unfurnished",
        "facing": "northwest",
        "floorNumber": 18,
        "totalFloors": 22,
        "parking": {
          "covered": 2,
          "open": 1
        },
        "balconies": 3,
        "age": "1-2 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 62, Plaza",
        "area": "Vaishali Nagar",
        "city": "Jaipur",
        "state": "Rajasthan",
        "pincode": "302021",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 25.9437,
          "lng": 85.9558
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": true,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        },
        {
          "url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
          "isPrimary": false,
          "caption": "Villa Exterior"
        }
      ],
      "status": "active",
      "availability": {
        "available": false,
        "availableFrom": "2026-03-12",
        "immediatelyAvailable": true
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 767,
        "favorites": 55,
        "inquiries": 26,
        "trending": true,
        "lastViewed": "2025-12-21T05:16:10.055120"
      },
      "apartment": {
        "societyName": "Unitech",
        "towerBlock": "Tower D",
        "maintenanceCharges": 2272,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1670780.34,
        "expectedYield": "4.20%"
      }
    },
    {
      "id": 38,
      "uniqueId": "DEL1038",
      "description": "Beautiful 2BHK flat apartment with premium amenities in Delhi. Spacious property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "rent",
      "area": {
        "value": 1499,
        "unit": "sqft"
      },
      "price": {
        "amount": 6986839,
        "display": "\u20b969L",
        "negotiable": true,
        "pricePerSqft": 4661,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1038",
        "name": "Ananya Sharma",
        "phone": "+91-9477069094",
        "email": "owner38@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "11 hours"
      },
      "amenities": [
        "cctv",
        "waste-management",
        "community-center",
        "parking",
        "security",
        "solar-panels",
        "yoga-studio",
        "gym",
        "gated-community",
        "lift",
        "power-backup"
      ],
      "features": {
        "bhk": 2,
        "furnished": "unfurnished",
        "facing": "northwest",
        "floorNumber": 15,
        "totalFloors": 16,
        "parking": {
          "covered": 1,
          "open": 0
        },
        "balconies": 2,
        "age": "2-5 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 53, Garden",
        "area": "South Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "pincode": "110017",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 20.0193,
          "lng": 84.3369
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "isPrimary": true,
          "caption": "Modern Kitchen"
        },
        {
          "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "isPrimary": false,
          "caption": "Master Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Apartment Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "isPrimary": false,
          "caption": "Living Area"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-07",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 822,
        "favorites": 90,
        "inquiries": 29,
        "trending": false,
        "lastViewed": "2025-12-09T05:16:10.055174"
      },
      "apartment": {
        "societyName": "Sobha Limited",
        "towerBlock": "Block 2",
        "maintenanceCharges": 3810,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 419210.34,
        "expectedYield": "7.11%"
      }
    },
    {
      "id": 39,
      "uniqueId": "KOL1039",
      "description": "Beautiful 4BHK flat apartment with premium amenities in Kolkata. Spacious property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "sell",
      "area": {
        "value": 3197,
        "unit": "sqft"
      },
      "price": {
        "amount": 15946636,
        "display": "\u20b9159L",
        "negotiable": true,
        "pricePerSqft": 4988,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1039",
        "name": "Arjun Verma",
        "phone": "+91-9577059023",
        "email": "owner39@realestate.com",
        "verified": false,
        "type": "owner",
        "responseTime": "22 hours"
      },
      "amenities": [
        "gym",
        "gated-community",
        "garden",
        "swimming-pool",
        "water-harvesting",
        "parking",
        "spa",
        "fire-safety",
        "power-backup",
        "lift",
        "library"
      ],
      "features": {
        "bhk": 4,
        "furnished": "unfurnished",
        "facing": "northeast",
        "floorNumber": 18,
        "totalFloors": 19,
        "parking": {
          "covered": 0,
          "open": 2
        },
        "balconies": 2,
        "age": "1-2 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 41, Garden",
        "area": "South Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pincode": "700071",
        "landmark": "Near Educational Institute",
        "coordinates": {
          "lat": 24.3366,
          "lng": 88.4724
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "isPrimary": true,
          "caption": "Living Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          "isPrimary": false,
          "caption": "Balcony View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
          "isPrimary": false,
          "caption": "Bedroom"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-03-02",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 818,
        "favorites": 79,
        "inquiries": 12,
        "trending": false,
        "lastViewed": "2025-12-11T05:16:10.055226"
      },
      "apartment": {
        "societyName": "Unitech",
        "towerBlock": "Tower A",
        "maintenanceCharges": 6639,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 956798.16,
        "expectedYield": "6.89%"
      }
    },
    {
      "id": 40,
      "uniqueId": "PUN1040",
      "description": "Beautiful 4BHK townhouse apartment with premium amenities in Pune. Luxurious property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "sell",
      "area": {
        "value": 2831,
        "unit": "sqft"
      },
      "price": {
        "amount": 15615796,
        "display": "\u20b9156L",
        "negotiable": true,
        "pricePerSqft": 5516,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1040",
        "name": "Nikhil Joshi",
        "phone": "+91-9891676675",
        "email": "owner40@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "3 hours"
      },
      "amenities": [
        "lift",
        "landscaping",
        "yoga-studio",
        "wifi",
        "garden",
        "power-backup",
        "basketball-court",
        "swimming-pool",
        "security",
        "theatre",
        "spa",
        "community-center",
        "intercom",
        "library",
        "gym"
      ],
      "features": {
        "bhk": 4,
        "furnished": "unfurnished",
        "facing": "south",
        "floorNumber": 12,
        "totalFloors": 12,
        "parking": {
          "covered": 1,
          "open": 0
        },
        "balconies": 4,
        "age": "0-1 year",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 21, Heights",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Educational Institute",
        "coordinates": {
          "lat": 23.9423,
          "lng": 73.5521
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": true,
          "caption": "City View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": false,
          "caption": "Modern Space"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-06",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 621,
        "favorites": 88,
        "inquiries": 23,
        "trending": true,
        "lastViewed": "2025-12-11T05:16:10.055284"
      },
      "apartment": {
        "societyName": "Prestige Gardens",
        "towerBlock": "Block 1",
        "maintenanceCharges": 7980,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 936947.76,
        "expectedYield": "7.49%"
      }
    },
    {
      "id": 41,
      "uniqueId": "KOL1041",
      "description": "Beautiful 5BHK bungalow apartment with premium amenities in Kolkata. Elegant property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "rent",
      "area": {
        "value": 2642,
        "unit": "sqft"
      },
      "price": {
        "amount": 10591778,
        "display": "\u20b9105L",
        "negotiable": false,
        "pricePerSqft": 4009,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1041",
        "name": "Rohan Sharma",
        "phone": "+91-9939680930",
        "email": "owner41@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "20 hours"
      },
      "amenities": [
        "wifi",
        "spa",
        "garden",
        "workspace",
        "library",
        "lift",
        "parking",
        "cctv",
        "swimming-pool",
        "yoga-studio",
        "theatre",
        "fire-safety",
        "power-backup",
        "solar-panels",
        "gym"
      ],
      "features": {
        "bhk": 5,
        "furnished": "semi-furnished",
        "facing": "north",
        "floorNumber": 20,
        "totalFloors": 40,
        "parking": {
          "covered": 2,
          "open": 2
        },
        "balconies": 2,
        "age": "2-5 years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 84, Residency",
        "area": "South Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pincode": "700071",
        "landmark": "Near Bus Terminal",
        "coordinates": {
          "lat": 26.3717,
          "lng": 86.6795
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": true,
          "caption": "Luxury Living"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": false,
          "caption": "City View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": false,
          "caption": "Modern Space"
        }
      ],
      "status": "active",
      "availability": {
        "available": false,
        "availableFrom": "2026-02-19",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 238,
        "favorites": 5,
        "inquiries": 19,
        "trending": true,
        "lastViewed": "2025-12-17T05:16:10.055417"
      },
      "apartment": {
        "societyName": "Brigade Group",
        "towerBlock": "Tower C",
        "maintenanceCharges": 6234,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 635506.68,
        "expectedYield": "6.77%"
      }
    },
    {
      "id": 42,
      "uniqueId": "JRP1042",
      "description": "Beautiful 1BHK flat apartment with premium amenities in Jaipur. Luxurious property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "sell",
      "area": {
        "value": 2111,
        "unit": "sqft"
      },
      "price": {
        "amount": 15473630,
        "display": "\u20b9154L",
        "negotiable": true,
        "pricePerSqft": 7330,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1042",
        "name": "Sanjay Verma",
        "phone": "+91-9571588738",
        "email": "owner42@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "2 hours"
      },
      "amenities": [
        "yoga-studio",
        "water-harvesting",
        "garden",
        "community-center",
        "cctv",
        "library",
        "gym",
        "swimming-pool",
        "club-house",
        "wifi",
        "parking",
        "power-backup",
        "lift",
        "playground",
        "gated-community"
      ],
      "features": {
        "bhk": 1,
        "furnished": "unfurnished",
        "facing": "northwest",
        "floorNumber": 11,
        "totalFloors": 31,
        "parking": {
          "covered": 0,
          "open": 1
        },
        "balconies": 4,
        "age": "2-5 years",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 33, Heights",
        "area": "Vaishali Nagar",
        "city": "Jaipur",
        "state": "Rajasthan",
        "pincode": "302021",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 24.4246,
          "lng": 84.7098
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": true,
          "caption": "Garden Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
          "isPrimary": false,
          "caption": "Luxury Villa"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Living Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": false,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        }
      ],
      "status": "inactive",
      "availability": {
        "available": false,
        "availableFrom": "2026-02-18",
        "immediatelyAvailable": true
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 504,
        "favorites": 101,
        "inquiries": 11,
        "trending": true,
        "lastViewed": "2025-12-25T05:16:10.055487"
      },
      "apartment": {
        "societyName": "DLF Homes",
        "towerBlock": "Tower D",
        "maintenanceCharges": 6834,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 928417.8,
        "expectedYield": "4.62%"
      }
    },
    {
      "id": 43,
      "uniqueId": "JRP1043",
      "description": "Beautiful 2BHK bungalow apartment with premium amenities in Jaipur. Elegant property with excellent location and connectivity.",
      "propertyType": "villa",
      "listingType": "rent",
      "area": {
        "value": 2680,
        "unit": "sqft"
      },
      "price": {
        "amount": 22662080,
        "display": "\u20b9226L",
        "negotiable": true,
        "pricePerSqft": 8456,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1043",
        "name": "Arjun Verma",
        "phone": "+91-9281444257",
        "email": "owner43@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "15 hours"
      },
      "amenities": [
        "parking",
        "tennis-court",
        "garden",
        "water-harvesting",
        "waste-management",
        "security",
        "landscaping",
        "intercom",
        "club-house",
        "yoga-studio",
        "power-backup",
        "theatre",
        "cctv"
      ],
      "features": {
        "bhk": 2,
        "furnished": "fully-furnished",
        "facing": "southeast",
        "floorNumber": 12,
        "totalFloors": 15,
        "parking": {
          "covered": 0,
          "open": 1
        },
        "balconies": 4,
        "age": "0-1 year",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 7, Residency",
        "area": "Vaishali Nagar",
        "city": "Jaipur",
        "state": "Rajasthan",
        "pincode": "302021",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 27.0183,
          "lng": 81.0196
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "isPrimary": true,
          "caption": "Villa Front View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
          "isPrimary": false,
          "caption": "Private Pool"
        },
        {
          "url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
          "isPrimary": false,
          "caption": "Villa Exterior"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-26",
        "immediatelyAvailable": true
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 194,
        "favorites": 107,
        "inquiries": 44,
        "trending": false,
        "lastViewed": "2025-12-22T05:16:10.055543"
      },
      "apartment": {
        "societyName": "Prestige Gardens",
        "towerBlock": "Tower D",
        "maintenanceCharges": 7109,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1359724.8,
        "expectedYield": "4.13%"
      }
    },
    {
      "id": 44,
      "uniqueId": "PUN1044",
      "description": "Beautiful 2BHK penthouse apartment with premium amenities in Pune. Spacious property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "sell",
      "area": {
        "value": 2267,
        "unit": "sqft"
      },
      "price": {
        "amount": 18238015,
        "display": "\u20b9182L",
        "negotiable": true,
        "pricePerSqft": 8045,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1044",
        "name": "Nikhil Joshi",
        "phone": "+91-9990185882",
        "email": "owner44@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "23 hours"
      },
      "amenities": [
        "intercom",
        "lift",
        "tennis-court",
        "spa",
        "cctv",
        "swimming-pool",
        "gated-community",
        "power-backup",
        "security",
        "parking",
        "wifi",
        "basketball-court",
        "club-house",
        "workspace"
      ],
      "features": {
        "bhk": 2,
        "furnished": "fully-furnished",
        "facing": "east",
        "floorNumber": 12,
        "totalFloors": 25,
        "parking": {
          "covered": 2,
          "open": 0
        },
        "balconies": 4,
        "age": "5-10 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 88, Plaza",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 20.7237,
          "lng": 76.2827
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": true,
          "caption": "Dining Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Exterior"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-06",
        "immediatelyAvailable": true
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 829,
        "favorites": 192,
        "inquiries": 10,
        "trending": true,
        "lastViewed": "2025-12-07T05:16:10.055677"
      },
      "apartment": {
        "societyName": "Brigade Group",
        "towerBlock": "Tower B",
        "maintenanceCharges": 6064,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1094280.9,
        "expectedYield": "3.51%"
      }
    },
    {
      "id": 45,
      "uniqueId": "KOL1045",
      "description": "Beautiful 3BHK penthouse apartment with premium amenities in Kolkata. Modern property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "sell",
      "area": {
        "value": 2632,
        "unit": "sqft"
      },
      "price": {
        "amount": 19395208,
        "display": "\u20b9193L",
        "negotiable": false,
        "pricePerSqft": 7369,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1045",
        "name": "Rohan Sharma",
        "phone": "+91-9984245729",
        "email": "owner45@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "15 hours"
      },
      "amenities": [
        "security",
        "library",
        "power-backup",
        "water-harvesting",
        "parking",
        "gym",
        "fire-safety",
        "playground"
      ],
      "features": {
        "bhk": 3,
        "furnished": "fully-furnished",
        "facing": "south",
        "floorNumber": 14,
        "totalFloors": 31,
        "parking": {
          "covered": 0,
          "open": 2
        },
        "balconies": 2,
        "age": "5-10 years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 96, Heights",
        "area": "South Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "pincode": "700071",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 20.3075,
          "lng": 73.7807
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": true,
          "caption": "Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1585399885289-30acddc6d0c1?w=800",
          "isPrimary": false,
          "caption": "Modern Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Living Space"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-01",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": true,
      "metrics": {
        "views": 242,
        "favorites": 121,
        "inquiries": 46,
        "trending": true,
        "lastViewed": "2025-12-16T05:16:10.055744"
      },
      "apartment": {
        "societyName": "Oberoi Realty",
        "towerBlock": "Block 1",
        "maintenanceCharges": 3560,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 1163712.48,
        "expectedYield": "6.36%"
      }
    },
    {
      "id": 46,
      "uniqueId": "PUN1046",
      "description": "Beautiful 1BHK penthouse apartment with premium amenities in Pune. Luxurious property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "sell",
      "area": {
        "value": 2740,
        "unit": "sqft"
      },
      "price": {
        "amount": 9247500,
        "display": "\u20b992L",
        "negotiable": false,
        "pricePerSqft": 3375,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1046",
        "name": "John Doe",
        "phone": "+91-9802513608",
        "email": "owner46@realestate.com",
        "verified": false,
        "type": "owner",
        "responseTime": "1 hours"
      },
      "amenities": [
        "security",
        "gym",
        "water-harvesting",
        "basketball-court",
        "tennis-court",
        "landscaping",
        "theatre",
        "gated-community",
        "spa",
        "wifi",
        "swimming-pool",
        "workspace",
        "community-center",
        "lift",
        "power-backup"
      ],
      "features": {
        "bhk": 1,
        "furnished": "unfurnished",
        "facing": "northeast",
        "floorNumber": 18,
        "totalFloors": 34,
        "parking": {
          "covered": 1,
          "open": 1
        },
        "balconies": 4,
        "age": "2-5 years",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 46, Heights",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Hospital",
        "coordinates": {
          "lat": 26.7019,
          "lng": 79.613
        },
        "nearby": {
          "schools": [
            "Greenwood High - 1.5km",
            "St. Xavier - 2.3km"
          ],
          "hospitals": [
            "Max Healthcare - 2.8km"
          ],
          "malls": [
            "Cyber Hub - 800m",
            "DLF Mall - 1.2km"
          ],
          "metro": "Cyber City Metro - 1.8km",
          "parks": [
            "Golf Course - 1km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": true,
          "caption": "Interior Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          "isPrimary": false,
          "caption": "Balcony View"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Area"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-04-23",
        "immediatelyAvailable": false
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 204,
        "favorites": 186,
        "inquiries": 26,
        "trending": true,
        "lastViewed": "2026-01-02T05:16:10.055802"
      },
      "apartment": {
        "societyName": "DLF Homes",
        "towerBlock": "Block 1",
        "maintenanceCharges": 5128,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 554850.0,
        "expectedYield": "3.80%"
      }
    },
    {
      "id": 47,
      "uniqueId": "PUN1047",
      "description": "Beautiful 5BHK flat apartment with premium amenities in Pune. Luxurious property with excellent location and connectivity.",
      "propertyType": "penthouse",
      "listingType": "rent",
      "area": {
        "value": 2219,
        "unit": "sqft"
      },
      "price": {
        "amount": 7517972,
        "display": "\u20b975L",
        "negotiable": true,
        "pricePerSqft": 3388,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1047",
        "name": "Rajesh Kumar",
        "phone": "+91-9141696224",
        "email": "owner47@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "21 hours"
      },
      "amenities": [
        "landscaping",
        "intercom",
        "playground",
        "library",
        "gym",
        "wifi",
        "spa",
        "swimming-pool"
      ],
      "features": {
        "bhk": 5,
        "furnished": "semi-furnished",
        "facing": "northwest",
        "floorNumber": 2,
        "totalFloors": 17,
        "parking": {
          "covered": 2,
          "open": 0
        },
        "balconies": 3,
        "age": "0-1 year",
        "possession": "under-construction",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 91, Tower",
        "area": "Koregaon Park",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411001",
        "landmark": "Near Educational Institute",
        "coordinates": {
          "lat": 19.6675,
          "lng": 83.2097
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
          "isPrimary": true,
          "caption": "Interior"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "isPrimary": false,
          "caption": "Modern Space"
        },
        {
          "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "isPrimary": false,
          "caption": "Luxury Living"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
          "isPrimary": false,
          "caption": "City View"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-02-25",
        "immediatelyAvailable": true
      },
      "isFeatured": true,
      "isVerified": false,
      "isPremium": false,
      "metrics": {
        "views": 651,
        "favorites": 155,
        "inquiries": 41,
        "trending": false,
        "lastViewed": "2025-12-06T05:16:10.055870"
      },
      "apartment": {
        "societyName": "Sobha Limited",
        "towerBlock": "Block 2",
        "maintenanceCharges": 9271,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 451078.32,
        "expectedYield": "7.83%"
      }
    },
    {
      "id": 48,
      "uniqueId": "BLR1048",
      "description": "Beautiful 1BHK villa apartment with premium amenities in Bangalore. Modern property with excellent location and connectivity.",
      "propertyType": "flat",
      "listingType": "rent",
      "area": {
        "value": 2016,
        "unit": "sqft"
      },
      "price": {
        "amount": 8158752,
        "display": "\u20b981L",
        "negotiable": true,
        "pricePerSqft": 4047,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1048",
        "name": "Aisha Khan",
        "phone": "+91-9515345391",
        "email": "owner48@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "13 hours"
      },
      "amenities": [
        "cctv",
        "swimming-pool",
        "community-center",
        "playground",
        "intercom",
        "wifi",
        "gym",
        "basketball-court",
        "landscaping",
        "lift",
        "yoga-studio",
        "power-backup"
      ],
      "features": {
        "bhk": 1,
        "furnished": "semi-furnished",
        "facing": "northwest",
        "floorNumber": 3,
        "totalFloors": 29,
        "parking": {
          "covered": 1,
          "open": 2
        },
        "balconies": 4,
        "age": "1-2 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 35, Residency",
        "area": "Whitefield",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560034",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 20.5404,
          "lng": 82.6792
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "isPrimary": true,
          "caption": "Modern Kitchen"
        },
        {
          "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "isPrimary": false,
          "caption": "Master Bedroom"
        },
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": false,
          "caption": "Apartment Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "isPrimary": false,
          "caption": "Living Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior Design"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-03-19",
        "immediatelyAvailable": false
      },
      "isFeatured": false,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 659,
        "favorites": 168,
        "inquiries": 4,
        "trending": false,
        "lastViewed": "2026-01-02T05:16:10.055943"
      },
      "apartment": {
        "societyName": "Tata Housing",
        "towerBlock": "Tower A",
        "maintenanceCharges": 9713,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 489525.12,
        "expectedYield": "3.69%"
      }
    },
    {
      "id": 49,
      "uniqueId": "GGN1049",
      "description": "Beautiful 3BHK flat apartment with premium amenities in Gurgaon. Elegant property with excellent location and connectivity.",
      "propertyType": "bungalow",
      "listingType": "sell",
      "area": {
        "value": 2266,
        "unit": "sqft"
      },
      "price": {
        "amount": 9197694,
        "display": "\u20b991L",
        "negotiable": true,
        "pricePerSqft": 4059,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1049",
        "name": "Pooja Nair",
        "phone": "+91-9166816702",
        "email": "owner49@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "11 hours"
      },
      "amenities": [
        "wifi",
        "fire-safety",
        "club-house",
        "intercom",
        "tennis-court",
        "power-backup",
        "cctv",
        "garden",
        "gated-community",
        "lift",
        "gym",
        "swimming-pool",
        "security"
      ],
      "features": {
        "bhk": 3,
        "furnished": "unfurnished",
        "facing": "north",
        "floorNumber": 14,
        "totalFloors": 38,
        "parking": {
          "covered": 2,
          "open": 2
        },
        "balconies": 4,
        "age": "0-1 year",
        "possession": "ready-to-move",
        "waterSupply": "24-hour",
        "cornerProperty": true
      },
      "location": {
        "address": "Sector 81, Heights",
        "area": "DLF Phase 1",
        "city": "Gurgaon",
        "state": "Haryana",
        "pincode": "122001",
        "landmark": "Near Railway Station",
        "coordinates": {
          "lat": 26.3583,
          "lng": 80.5785
        },
        "nearby": {
          "schools": [
            "Inventure Academy - 2.1km",
            "Bangalore School - 1.1km"
          ],
          "hospitals": [
            "Manipal Hospital - 3.2km",
            "Apollo Hospital - 2km"
          ],
          "malls": [
            "Nexus Shantiniketan - 900m"
          ],
          "metro": "Whitefield Metro - 2km",
          "parks": [
            "Bangalore Tech Park - 1.5km"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "isPrimary": true,
          "caption": "Living Area"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          "isPrimary": false,
          "caption": "Balcony View"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-01-06",
        "immediatelyAvailable": true
      },
      "isFeatured": true,
      "isVerified": false,
      "isPremium": false,
      "metrics": {
        "views": 566,
        "favorites": 27,
        "inquiries": 2,
        "trending": true,
        "lastViewed": "2025-12-28T05:16:10.056040"
      },
      "apartment": {
        "societyName": "Emaar Properties",
        "towerBlock": "Block 1",
        "maintenanceCharges": 6775,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 551861.64,
        "expectedYield": "6.57%"
      }
    },
    {
      "id": 50,
      "uniqueId": "GGN1050",
      "description": "Beautiful 2BHK penthouse apartment with premium amenities in Gurgaon. Elegant property with excellent location and connectivity.",
      "propertyType": "townhouse",
      "listingType": "sell",
      "area": {
        "value": 3044,
        "unit": "sqft"
      },
      "price": {
        "amount": 16236696,
        "display": "\u20b9162L",
        "negotiable": true,
        "pricePerSqft": 5334,
        "currency": "INR"
      },
      "owner": {
        "id": "user_1050",
        "name": "Ananya Sharma",
        "phone": "+91-9178228113",
        "email": "owner50@realestate.com",
        "verified": true,
        "type": "owner",
        "responseTime": "16 hours"
      },
      "amenities": [
        "parking",
        "waste-management",
        "community-center",
        "fire-safety",
        "workspace",
        "security",
        "cctv",
        "library"
      ],
      "features": {
        "bhk": 2,
        "furnished": "unfurnished",
        "facing": "southwest",
        "floorNumber": 14,
        "totalFloors": 14,
        "parking": {
          "covered": 0,
          "open": 1
        },
        "balconies": 1,
        "age": "5-10 years",
        "possession": "under-negotiation",
        "waterSupply": "24-hour",
        "cornerProperty": false
      },
      "location": {
        "address": "Sector 21, Tower",
        "area": "DLF Phase 1",
        "city": "Gurgaon",
        "state": "Haryana",
        "pincode": "122001",
        "landmark": "Near Shopping Complex",
        "coordinates": {
          "lat": 23.9368,
          "lng": 76.784
        },
        "nearby": {
          "schools": [
            "DPS School - 1.2km",
            "Ryan International - 2km",
            "Delhi Public Foundation - 2.5km"
          ],
          "hospitals": [
            "Fortis Hospital - 3km",
            "Apollo Clinic - 1.5km"
          ],
          "malls": [
            "Phoenix Mall - 500m",
            "High Street - 1km"
          ],
          "metro": "Mansarovar Metro - 2.5km",
          "parks": [
            "Central Park - 800m"
          ]
        }
      },
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "isPrimary": true,
          "caption": "Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1585399885289-30acddc6d0c1?w=800",
          "isPrimary": false,
          "caption": "Modern Design"
        },
        {
          "url": "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
          "isPrimary": false,
          "caption": "Dining Room"
        },
        {
          "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "isPrimary": false,
          "caption": "Interior"
        }
      ],
      "status": "active",
      "availability": {
        "available": true,
        "availableFrom": "2026-04-19",
        "immediatelyAvailable": false
      },
      "isFeatured": true,
      "isVerified": true,
      "isPremium": false,
      "metrics": {
        "views": 642,
        "favorites": 169,
        "inquiries": 36,
        "trending": false,
        "lastViewed": "2025-12-22T05:16:10.056100"
      },
      "apartment": {
        "societyName": "K Raheja Corp",
        "towerBlock": "Tower C",
        "maintenanceCharges": 9294,
        "maintenanceFrequency": "monthly",
        "registrationCharges": 974201.76,
        "expectedYield": "3.49%"
      }
    }
];

export default propertyData;

// const propertyData = [
//   {
//     id:1,
//     description: "Spacious 3BHK apartment with modern amenities...",
//     propertyType: "flat",
//     listingType: "sell",
//     area: {
//       value: 1450,
//       unit: "sqft",
//     },
//     price: {
//       amount: 7500000,
//       display: "75L",
//       negotiable: true,
//       pricePerSqft: 5172,
//     },
//     owner: {
//       id: "user_123",
//       name: "John Doe",
//       phone: "+91-9876543210",
//       email: "john@example.com",
//       verified: true,
//       type: "owner",
//     },
//     amenities: [
//       "parking",
//       "gym",
//       "swimming-pool",
//       "garden",
//       "security",
//       "power-backup",
//       "lift",
//       "club-house",
//     ],
//     features: {
//       furnished: "semi-furnished",
//       facing: "east",
//       floorNumber: 5,
//       totalFloors: 12,
//       parking: {
//         covered: 1,
//         open: 1,
//       },
//       balconies: 2,
//       age: "2-5 years",
//       possession: "ready-to-move",
//     },
//     // location detail/
//     location: {
//       address: "Sector 34, BKC Tower",
//       area: "Vaishali Nagar",
//       city: "Jaipur",
//       state: "Rajasthan",
//       pincode: "302021",
//       landmark: "Near Phoenix Mall",

//       // Geospatial coordinates for map
//       coordinates: {
//         lat: 26.9124,
//         lng: 75.7873,
//       },

//       // Nearby places
//       nearby: {
//         schools: ["DPS School - 1.2km", "Ryan International - 2km"],
//         hospitals: ["Fortis Hospital - 3km"],
//         malls: ["Phoenix Mall - 500m"],
//         metro: "Mansarovar Metro - 2.5km",
//       },
// //     },

// //     // media details
// images: [
//   {
//     url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
//     isPrimary: true,
//     caption: "Living Room",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
//     isPrimary: false,
//     caption: "Modern Kitchen",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
//     isPrimary: false,
//     caption: "Master Bedroom",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
//     isPrimary: false,
//     caption: "Apartment Exterior",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
//     isPrimary: false,
//     caption: "Living Area",
//   },
// ],
//     video: {
//       url: "https://youtube.com/...",
//       thumbnail: "https://...",
//     },

//     documents: [
//       {
//         type: "title-deed",
//         url: "https://...",
//         verified: true,
//       },
//     ],

//     // status
//     status: "active", // "sold", "rented", "pending", "inactive"
//     availability: {
//       available: true,
//       availableFrom: "2024-01-01",
//       immediatelyAvailable: true,
//     },

//     // for featured /listings
//     isFeatured: true,
//     isVerified: true,
//     isPremium: false,
//     featuredUntil: "2024-12-31",

//     // matricis
//     metrics: {
//       views: 245,
//       favorites: 45,
//       inquiries: 12,
//       lastViewed: "2024-12-30T10:30:00Z",
//       trending: true,
//     },

//     // Timestamps & Metadata
//     timestamps: {
//       createdAt: "2024-11-01T00:00:00Z",
//       updatedAt: "2024-12-30T00:00:00Z",
//       publishedAt: "2024-11-02T00:00:00Z",
//       expiresAt: "2025-12-31T23:59:59Z",
//     },

//     // title and description
//     seo: {
//       slug: "3-bhk-luxury-flat-vaishali-nagar-jaipur",
//       metaTitle: "3 BHK Luxury Flat for Sale in Vaishali Nagar",
//       metaDescription: "Spacious 3BHK apartment...",
//     },

//     // Additional Property-Specific Fields
//     // For Flats/Apartments:
//     apartment: {
//       societyName: "Prestige Gardens",
//       towerBlock: "Tower A",
//       maintenanceCharges: 3500,
//       maintenanceFrequency: "monthly",
//     },
//     // For plots
//     plot: {
//       plotNumber: "45",
//       dimensions: "40x60 feet",
//       boundaryWall: true,
//       cornerPlot: false,
//       roadWidth: "30 feet",
//       facingRoad: true,
//     },
//     // For villas
//     villa: {
//       floors: 2,
//       servants_quarters: true,
//       garden: true,
//       gardenArea: "500 sqft",
//     },

//     //  Rental-Specific Fields (if listingType: "rent")
//     rental: {
//       monthlyRent: 35000,
//       securityDeposit: 105000, // Usually 3 months
//       maintenanceIncluded: false,
//       preferredTenants: "family", // "bachelor", "company"
//       leaseDuration: "11 months minimum",
//       availableFor: "longterm", // "shortterm"
//     },
//   },
   
// ];

// export default propertyData;