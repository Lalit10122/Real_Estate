import mongoose from "mongoose";
import dotenv from "dotenv";
import propertyModel from "./models/propertyData.model.js"; // adjust path if needed

dotenv.config();

// ─── Valid enum values from your Mongoose schema ─────────────────────────────
const VALID_PROPERTY_TYPES = [
  "flat",
  "house",
  "villa",
  "plot",
  "commercial",
  "pg",
  "office",
];
const VALID_LISTING_TYPES = ["sell", "rent", "lease"];
const VALID_AREA_UNITS = ["sqft", "sqm", "sqyd", "acre", "hectare"];
const VALID_FURNISHED = ["furnished", "semi-furnished", "unfurnished"];
const VALID_FACING = [
  "north",
  "south",
  "east",
  "west",
  "north-east",
  "north-west",
  "south-east",
  "south-west",
];
const VALID_AGE = ["0-1", "1-2", "2-5", "5-10", "10+", "under-construction"];
const VALID_POSSESSION = ["ready-to-move", "under-construction"];
const VALID_OWNER_TYPES = ["owner", "dealer", "builder", "agent"];
const VALID_STATUS = [
  "active",
  "inactive",
  "sold",
  "rented",
  "pending",
  "draft",
];
const VALID_AMENITIES = [
  "parking",
  "gym",
  "swimming-pool",
  "garden",
  "security",
  "power-backup",
  "lift",
  "club-house",
  "children-play-area",
  "cctv",
  "fire-safety",
  "water-supply",
  "internet",
  "air-conditioning",
  "maintenance-staff",
  "visitor-parking",
  "intercom",
  "piped-gas",
  "rainwater-harvesting",
  "sewage-treatment",
];

// ─── Mapping tables ───────────────────────────────────────────────────────────
const PROPERTY_TYPE_MAP = {
  bungalow: "house",
  penthouse: "flat",
  townhouse: "house",
};
const AMENITY_MAP = {
  wifi: "internet",
  park: "garden",
  playground: "children-play-area",
  "gated-community": "security",
  "waste-management": "sewage-treatment",
  "water-harvesting": "rainwater-harvesting",
  landscaping: "garden",
  // null = drop it
  "basketball-court": null,
  workspace: null,
  theatre: null,
  "solar-panels": null,
  library: null,
  "tennis-court": null,
  spa: null,
  "yoga-studio": null,
  "community-center": null,
};
const AGE_MAP = {
  "0-1 year": "0-1",
  "1-2 years": "1-2",
  "2-5 years": "2-5",
  "5-10 years": "5-10",
  "10+ years": "10+",
};
const POSSESSION_MAP = { "under-negotiation": "under-construction" };
const FACING_NORMALIZE = {
  southwest: "south-west",
  northwest: "north-west",
  northeast: "north-east",
  southeast: "south-east",
};

// ─── Sanitizer ────────────────────────────────────────────────────────────────
function sanitize(raw) {
  const propertyType = VALID_PROPERTY_TYPES.includes(raw.propertyType)
    ? raw.propertyType
    : PROPERTY_TYPE_MAP[raw.propertyType] || "flat";

  const listingType = VALID_LISTING_TYPES.includes(raw.listingType)
    ? raw.listingType
    : "sell";
  const areaUnit = VALID_AREA_UNITS.includes(raw.area?.unit)
    ? raw.area.unit
    : "sqft";

  const amenities = [
    ...new Set(
      (raw.amenities || [])
        .map((a) =>
          VALID_AMENITIES.includes(a) ? a : (AMENITY_MAP[a] ?? null),
        )
        .filter(Boolean),
    ),
  ];

  const f = raw.features || {};
  const furnished = VALID_FURNISHED.includes(f.furnished)
    ? f.furnished
    : "unfurnished";
  let facing = (f.facing || "").toLowerCase().replace(/\s/g, "");
  facing = FACING_NORMALIZE[facing] || facing;
  if (!VALID_FACING.includes(facing)) facing = undefined;

  let age = VALID_AGE.includes(f.age) ? f.age : AGE_MAP[f.age] || undefined;
  let possession = VALID_POSSESSION.includes(f.possession)
    ? f.possession
    : POSSESSION_MAP[f.possession] || "ready-to-move";

  const ownerType = VALID_OWNER_TYPES.includes(raw.owner?.type)
    ? raw.owner.type
    : "owner";
  const status = VALID_STATUS.includes(raw.status) ? raw.status : "active";

  return {
    userId: raw.owner?.id || "seed_user",
    description: raw.description,
    propertyType,
    listingType,
    area: { value: raw.area?.value || 1000, unit: areaUnit },
    price: {
      amount: raw.price?.amount || 0,
      display: raw.price?.display || "",
      negotiable: raw.price?.negotiable ?? false,
      pricePerSqft: raw.price?.pricePerSqft,
    },
    owner: {
      id: raw.owner?.id || "seed_user",
      name: raw.owner?.name || "Unknown",
      phone: raw.owner?.phone || "+91-0000000000",
      email: raw.owner?.email || "unknown@example.com",
      verified: raw.owner?.verified ?? false,
      type: ownerType,
    },
    amenities,
    features: {
      furnished,
      ...(facing ? { facing } : {}),
      floorNumber: f.floorNumber ?? 0,
      totalFloors: Math.max(f.totalFloors ?? 1, 1),
      parking: { covered: f.parking?.covered ?? 0, open: f.parking?.open ?? 0 },
      balconies: f.balconies ?? 0,
      ...(age ? { age } : {}),
      possession,
    },
    location: {
      address: raw.location?.address || "Unknown Address",
      area: raw.location?.area || "Unknown Area",
      city: raw.location?.city || "Unknown City",
      state: raw.location?.state || "Unknown State",
      pincode: raw.location?.pincode || "000000",
      landmark: raw.location?.landmark,
      coordinates: raw.location?.coordinates,
      nearby: {
        schools: raw.location?.nearby?.schools || [],
        hospitals: raw.location?.nearby?.hospitals || [],
        malls: raw.location?.nearby?.malls || [],
        metro: raw.location?.nearby?.metro,
      },
    },
    images: (raw.images || []).map((img, i) => ({
      url: img.url,
      isPrimary: i === 0,
      caption: img.caption || "",
    })),
    status,
    availability: {
      available: raw.availability?.available ?? true,
      availableFrom: raw.availability?.availableFrom
        ? new Date(raw.availability.availableFrom)
        : undefined,
      immediatelyAvailable: raw.availability?.immediatelyAvailable ?? false,
    },
    isFeatured: raw.isFeatured ?? false,
    isVerified: raw.isVerified ?? false,
    isPremium: raw.isPremium ?? false,
    metrics: {
      views: raw.metrics?.views ?? 0,
      favorites: raw.metrics?.favorites ?? 0,
      inquiries: raw.metrics?.inquiries ?? 0,
      trending: raw.metrics?.trending ?? false,
    },
    ...(raw.apartment
      ? {
          apartment: {
            societyName: raw.apartment.societyName,
            towerBlock: raw.apartment.towerBlock,
            maintenanceCharges: raw.apartment.maintenanceCharges,
            maintenanceFrequency:
              raw.apartment.maintenanceFrequency || "monthly",
          },
        }
      : {}),
  };
}

// ─── Raw data ─────────────────────────────────────────────────────────────────
const rawData = [
  {
    description:
      "Spacious 3BHK apartment with modern amenities in Vaishali Nagar. Close to schools, hospitals and malls.",
    propertyType: "flat",
    listingType: "sell",
    area: { value: 1450, unit: "sqft" },
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
      parking: { covered: 1, open: 1 },
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
      coordinates: { lat: 26.9124, lng: 75.7873 },
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
    metrics: { views: 245, favorites: 45, inquiries: 12, trending: true },
    apartment: {
      societyName: "Prestige Gardens",
      towerBlock: "Tower A",
      maintenanceCharges: 3500,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Luxurious 4BHK villa with private garden and pool in Malviya Nagar.",
    propertyType: "villa",
    listingType: "sell",
    area: { value: 3200, unit: "sqft" },
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
      "cctv",
    ],
    features: {
      furnished: "furnished",
      facing: "north",
      floorNumber: 0,
      totalFloors: 3,
      parking: { covered: 2, open: 2 },
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
      coordinates: { lat: 26.8467, lng: 75.8056 },
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
    metrics: { views: 512, favorites: 89, inquiries: 23, trending: true },
    apartment: {
      societyName: "Royal Enclave Villas",
      maintenanceCharges: 8000,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "2BHK apartment for rent in prime C-Scheme location with great connectivity.",
    propertyType: "flat",
    listingType: "rent",
    area: { value: 950, unit: "sqft" },
    price: {
      amount: 25000,
      display: "25K/mo",
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
    amenities: ["parking", "gym", "security", "power-backup", "lift"],
    features: {
      furnished: "semi-furnished",
      facing: "south",
      floorNumber: 3,
      totalFloors: 8,
      parking: { covered: 1, open: 0 },
      balconies: 1,
      age: "2-5",
      possession: "ready-to-move",
    },
    location: {
      address: "Block C, Green Heights",
      area: "C-Scheme",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      landmark: "Near Birla Mandir",
      coordinates: { lat: 26.9033, lng: 75.7873 },
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
    metrics: { views: 178, favorites: 34, inquiries: 8, trending: false },
    apartment: {
      societyName: "Green Heights Society",
      towerBlock: "Block C",
      maintenanceCharges: 2000,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Commercial plot in prime business district near Jaipur Airport. RERA approved, clear title.",
    propertyType: "plot",
    listingType: "sell",
    area: { value: 2400, unit: "sqft" },
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
    amenities: ["security", "power-backup"],
    features: {
      furnished: "unfurnished",
      facing: "east",
      floorNumber: 0,
      totalFloors: 1,
      parking: { covered: 0, open: 3 },
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
      coordinates: { lat: 26.8242, lng: 75.812 },
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
    ],
    status: "active",
    availability: { available: true, immediatelyAvailable: true },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: { views: 423, favorites: 67, inquiries: 19, trending: true },
  },
  {
    description:
      "Modern 1BHK furnished apartment for bachelors near IT hub in Jagatpura.",
    propertyType: "flat",
    listingType: "rent",
    area: { value: 650, unit: "sqft" },
    price: {
      amount: 15000,
      display: "15K/mo",
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
    amenities: ["parking", "security", "power-backup", "lift", "internet"],
    features: {
      furnished: "furnished",
      facing: "west",
      floorNumber: 2,
      totalFloors: 5,
      parking: { covered: 0, open: 1 },
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
      coordinates: { lat: 26.836, lng: 75.8648 },
      nearby: {
        schools: ["Seedling School - 1.5km"],
        hospitals: ["Mahatma Gandhi Hospital - 2km"],
        malls: ["Fun Cinemas Mall - 3km"],
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        isPrimary: true,
        caption: "Master Bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        isPrimary: false,
        caption: "Living Area",
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
    metrics: { views: 92, favorites: 12, inquiries: 5, trending: false },
    apartment: {
      societyName: "Tech Park Residency",
      towerBlock: "Block A",
      maintenanceCharges: 1500,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Premium 5BHK penthouse with terrace garden and panoramic city views in Raja Park.",
    propertyType: "flat",
    listingType: "sell",
    area: { value: 4500, unit: "sqft" },
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
      "internet",
      "air-conditioning",
    ],
    features: {
      furnished: "furnished",
      facing: "north-east",
      floorNumber: 15,
      totalFloors: 15,
      parking: { covered: 3, open: 1 },
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
      coordinates: { lat: 26.9154, lng: 75.787 },
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
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
        isPrimary: false,
        caption: "City View",
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
    metrics: { views: 1245, favorites: 234, inquiries: 56, trending: true },
    apartment: {
      societyName: "Sky Towers Premium",
      towerBlock: "Tower A - Penthouse",
      maintenanceCharges: 12000,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Affordable 2BHK flat in developing Sanganer area. Good connectivity to airport.",
    propertyType: "flat",
    listingType: "sell",
    area: { value: 850, unit: "sqft" },
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
    amenities: ["parking", "security", "power-backup", "lift"],
    features: {
      furnished: "unfurnished",
      facing: "south-west",
      floorNumber: 1,
      totalFloors: 4,
      parking: { covered: 1, open: 0 },
      balconies: 1,
      age: "1-2",
      possession: "under-construction",
    },
    location: {
      address: "Flat 101, Sunrise Apartments",
      area: "Sanganer",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302029",
      landmark: "Near Sanganer Airport",
      coordinates: { lat: 26.8173, lng: 75.807 },
      nearby: {
        schools: ["Maheshwari Public School - 1km"],
        hospitals: ["Sawai Man Singh Hospital - 4km"],
        malls: ["Pink Square Mall - 5km"],
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        isPrimary: true,
        caption: "Bedroom",
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
    metrics: { views: 156, favorites: 28, inquiries: 11, trending: false },
    apartment: {
      societyName: "Sunrise Residency",
      towerBlock: "Block B",
      maintenanceCharges: 1800,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Commercial office space in IT park Sitapura. Fully furnished with internet and 24/7 security.",
    propertyType: "commercial",
    listingType: "rent",
    area: { value: 2000, unit: "sqft" },
    price: {
      amount: 80000,
      display: "80K/mo",
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
      "internet",
      "air-conditioning",
      "maintenance-staff",
      "cctv",
    ],
    features: {
      furnished: "furnished",
      facing: "north",
      floorNumber: 4,
      totalFloors: 10,
      parking: { covered: 5, open: 10 },
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
      coordinates: { lat: 26.7808, lng: 75.8648 },
      nearby: {
        hospitals: ["Metro MAS Hospital - 2km"],
        malls: ["Elements Mall - 8km"],
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
    metrics: { views: 334, favorites: 45, inquiries: 18, trending: false },
    apartment: {
      societyName: "IT Tower Business Park",
      maintenanceCharges: 10000,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Spacious 3BHK independent villa for rent with private pool in Mansarovar.",
    propertyType: "villa",
    listingType: "rent",
    area: { value: 2800, unit: "sqft" },
    price: {
      amount: 60000,
      display: "60K/mo",
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
      "internet",
      "cctv",
    ],
    features: {
      furnished: "semi-furnished",
      facing: "east",
      floorNumber: 0,
      totalFloors: 2,
      parking: { covered: 2, open: 2 },
      balconies: 3,
      age: "1-2",
      possession: "ready-to-move",
    },
    location: {
      address: "Villa 23, Palm Grove",
      area: "Mansarovar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302020",
      landmark: "Near JDA Approved Colony",
      coordinates: { lat: 26.8514, lng: 75.7374 },
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
    metrics: { views: 567, favorites: 98, inquiries: 34, trending: true },
    apartment: {
      societyName: "Palm Grove Villas",
      maintenanceCharges: 7000,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Prime residential plot in gated community on Tonk Road. RERA approved with clear titles.",
    propertyType: "plot",
    listingType: "sell",
    area: { value: 1800, unit: "sqft" },
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
    amenities: ["garden", "security", "power-backup"],
    features: {
      furnished: "unfurnished",
      facing: "north-west",
      floorNumber: 0,
      totalFloors: 1,
      parking: { covered: 0, open: 2 },
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
      coordinates: { lat: 26.8512, lng: 75.8044 },
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
        url: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800",
        isPrimary: false,
        caption: "Boundary",
      },
    ],
    status: "active",
    availability: { available: true, immediatelyAvailable: true },
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    metrics: { views: 289, favorites: 52, inquiries: 15, trending: false },
  },
  // Multi-city properties
  {
    description:
      "Beautiful 3BHK apartment with premium amenities in Pune's Koregaon Park.",
    propertyType: "bungalow",
    listingType: "sell",
    area: { value: 3343, unit: "sqft" },
    price: {
      amount: 29100815,
      display: "₹291L",
      negotiable: true,
      pricePerSqft: 8705,
    },
    owner: {
      id: "user_1011",
      name: "Sanjay Verma",
      phone: "+91-9572574841",
      email: "owner11@realestate.com",
      verified: false,
      type: "owner",
    },
    amenities: [
      "security",
      "garden",
      "lift",
      "parking",
      "cctv",
      "swimming-pool",
      "fire-safety",
    ],
    features: {
      furnished: "furnished",
      facing: "southwest",
      floorNumber: 7,
      totalFloors: 40,
      parking: { covered: 0, open: 2 },
      balconies: 1,
      age: "0-1 year",
      possession: "ready-to-move",
    },
    location: {
      address: "Sector 79, Heights",
      area: "Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      landmark: "Near Shopping Complex",
      coordinates: { lat: 18.536, lng: 73.882 },
      nearby: {
        schools: ["Greenwood High - 1.5km"],
        hospitals: ["Max Healthcare - 2.8km"],
        malls: ["Cyber Hub - 800m"],
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
    ],
    status: "inactive",
    availability: {
      available: true,
      availableFrom: "2026-03-23",
      immediatelyAvailable: false,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: { views: 301, favorites: 108, inquiries: 27, trending: false },
    apartment: {
      societyName: "Sunteck Realty",
      towerBlock: "Tower B",
      maintenanceCharges: 3462,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Beautiful 3BHK flat in Bangalore's Whitefield tech corridor. Semi-furnished.",
    propertyType: "penthouse",
    listingType: "sell",
    area: { value: 2102, unit: "sqft" },
    price: {
      amount: 10991358,
      display: "₹109L",
      negotiable: true,
      pricePerSqft: 5229,
    },
    owner: {
      id: "user_1012",
      name: "Priya Singh",
      phone: "+91-9055956276",
      email: "owner12@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: ["lift", "power-backup", "cctv", "security", "gym", "internet"],
    features: {
      furnished: "semi-furnished",
      facing: "northwest",
      floorNumber: 4,
      totalFloors: 31,
      parking: { covered: 1, open: 2 },
      balconies: 2,
      age: "2-5 years",
      possession: "under-construction",
    },
    location: {
      address: "Sector 62, Plaza",
      area: "Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034",
      landmark: "Near Educational Institute",
      coordinates: { lat: 12.9698, lng: 77.7499 },
      nearby: {
        schools: ["Inventure Academy - 2.1km"],
        hospitals: ["Manipal Hospital - 3.2km"],
        malls: ["Nexus Shantiniketan - 900m"],
        metro: "Whitefield Metro - 2km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
        isPrimary: true,
        caption: "City View",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
        isPrimary: false,
        caption: "Interior",
      },
    ],
    status: "inactive",
    availability: {
      available: true,
      availableFrom: "2026-01-03",
      immediatelyAvailable: false,
    },
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    metrics: { views: 538, favorites: 19, inquiries: 16, trending: false },
    apartment: {
      societyName: "DLF Homes",
      towerBlock: "Tower C",
      maintenanceCharges: 8674,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "4BHK house in Kolkata's South area. Spacious with excellent amenities.",
    propertyType: "bungalow",
    listingType: "rent",
    area: { value: 2510, unit: "sqft" },
    price: {
      amount: 8988310,
      display: "₹89L",
      negotiable: false,
      pricePerSqft: 3581,
    },
    owner: {
      id: "user_1013",
      name: "John Doe",
      phone: "+91-9533771923",
      email: "owner13@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "gym",
      "club-house",
      "swimming-pool",
      "cctv",
      "fire-safety",
      "security",
      "water-supply",
    ],
    features: {
      furnished: "semi-furnished",
      facing: "northwest",
      floorNumber: 10,
      totalFloors: 25,
      parking: { covered: 0, open: 2 },
      balconies: 1,
      age: "0-1 year",
      possession: "ready-to-move",
    },
    location: {
      address: "Sector 71, Heights",
      area: "South Kolkata",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700071",
      landmark: "Near Railway Station",
      coordinates: { lat: 22.5354, lng: 88.3642 },
      nearby: {
        schools: ["Inventure Academy - 2.1km"],
        hospitals: ["Manipal Hospital - 3.2km"],
        malls: ["Nexus Shantiniketan - 900m"],
        metro: "Whitefield Metro - 2km",
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
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2026-04-13",
      immediatelyAvailable: true,
    },
    isFeatured: false,
    isVerified: true,
    isPremium: false,
    metrics: { views: 255, favorites: 135, inquiries: 17, trending: false },
    apartment: {
      societyName: "Mahindra Lifespaces",
      towerBlock: "Block 2",
      maintenanceCharges: 2018,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Beautiful 1BHK villa in Hyderabad's Hitech City tech hub. Fully furnished.",
    propertyType: "villa",
    listingType: "sell",
    area: { value: 3037, unit: "sqft" },
    price: {
      amount: 10049433,
      display: "₹100L",
      negotiable: true,
      pricePerSqft: 3309,
    },
    owner: {
      id: "user_1017",
      name: "Pooja Nair",
      phone: "+91-9465946053",
      email: "owner17@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "intercom",
      "security",
      "parking",
      "cctv",
      "power-backup",
      "garden",
    ],
    features: {
      furnished: "furnished",
      facing: "southwest",
      floorNumber: 14,
      totalFloors: 18,
      parking: { covered: 0, open: 2 },
      balconies: 3,
      age: "0-1 year",
      possession: "ready-to-move",
    },
    location: {
      address: "Sector 89, Residency",
      area: "Hitech City",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
      landmark: "Near Railway Station",
      coordinates: { lat: 17.4435, lng: 78.3772 },
      nearby: {
        hospitals: ["Manipal Hospital - 3.2km"],
        malls: ["Nexus Shantiniketan - 900m"],
        metro: "Whitefield Metro - 2km",
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
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2026-01-04",
      immediatelyAvailable: false,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: { views: 254, favorites: 114, inquiries: 44, trending: false },
    apartment: {
      societyName: "Godrej Properties",
      towerBlock: "Tower A",
      maintenanceCharges: 2078,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Beautiful 3BHK villa in Gurgaon's DLF Phase 1. Semi-furnished, gated community.",
    propertyType: "villa",
    listingType: "sell",
    area: { value: 1547, unit: "sqft" },
    price: {
      amount: 10997623,
      display: "₹109L",
      negotiable: false,
      pricePerSqft: 7109,
    },
    owner: {
      id: "user_1019",
      name: "Sanjay Verma",
      phone: "+91-9026013458",
      email: "owner19@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "gym",
      "club-house",
      "garden",
      "power-backup",
      "internet",
      "security",
      "cctv",
    ],
    features: {
      furnished: "semi-furnished",
      facing: "north",
      floorNumber: 10,
      totalFloors: 36,
      parking: { covered: 2, open: 2 },
      balconies: 1,
      age: "2-5 years",
      possession: "under-construction",
    },
    location: {
      address: "Sector 64, Residency",
      area: "DLF Phase 1",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      landmark: "Near Educational Institute",
      coordinates: { lat: 28.4595, lng: 77.0266 },
      nearby: {
        schools: ["DPS School - 1.2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        isPrimary: true,
        caption: "Villa Front View",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        isPrimary: false,
        caption: "Villa Exterior",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2026-01-21",
      immediatelyAvailable: true,
    },
    isFeatured: false,
    isVerified: false,
    isPremium: false,
    metrics: { views: 514, favorites: 141, inquiries: 25, trending: false },
    apartment: {
      societyName: "Brigade Group",
      towerBlock: "Block 2",
      maintenanceCharges: 9901,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "Luxury 5BHK villa for sale in Jaipur's Vaishali Nagar with premium finishes.",
    propertyType: "villa",
    listingType: "sell",
    area: { value: 3379, unit: "sqft" },
    price: {
      amount: 27846339,
      display: "₹278L",
      negotiable: true,
      pricePerSqft: 8241,
    },
    owner: {
      id: "user_1037",
      name: "Aditya Rao",
      phone: "+91-9900475336",
      email: "owner37@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "club-house",
      "security",
      "garden",
      "intercom",
      "cctv",
      "swimming-pool",
      "gym",
    ],
    features: {
      furnished: "unfurnished",
      facing: "northwest",
      floorNumber: 18,
      totalFloors: 22,
      parking: { covered: 2, open: 1 },
      balconies: 3,
      age: "1-2 years",
      possession: "under-construction",
    },
    location: {
      address: "Sector 62, Plaza",
      area: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      landmark: "Near Railway Station",
      coordinates: { lat: 26.9124, lng: 75.7873 },
      nearby: {
        schools: ["DPS School - 1.2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
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
    ],
    status: "active",
    availability: {
      available: false,
      availableFrom: "2026-03-12",
      immediatelyAvailable: true,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: { views: 767, favorites: 55, inquiries: 26, trending: true },
    apartment: {
      societyName: "Unitech",
      towerBlock: "Tower D",
      maintenanceCharges: 2272,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "2BHK villa for rent in Jaipur Vaishali Nagar. Fully furnished with pool access.",
    propertyType: "villa",
    listingType: "rent",
    area: { value: 2680, unit: "sqft" },
    price: {
      amount: 22662080,
      display: "₹226L",
      negotiable: true,
      pricePerSqft: 8456,
    },
    owner: {
      id: "user_1043",
      name: "Arjun Verma",
      phone: "+91-9281444257",
      email: "owner43@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "garden",
      "security",
      "club-house",
      "cctv",
      "power-backup",
      "intercom",
      "swimming-pool",
    ],
    features: {
      furnished: "furnished",
      facing: "southeast",
      floorNumber: 12,
      totalFloors: 15,
      parking: { covered: 0, open: 1 },
      balconies: 4,
      age: "0-1 year",
      possession: "under-construction",
    },
    location: {
      address: "Sector 7, Residency",
      area: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      landmark: "Near Railway Station",
      coordinates: { lat: 26.9124, lng: 75.7873 },
      nearby: {
        schools: ["DPS School - 1.2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
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
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2026-02-26",
      immediatelyAvailable: true,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: { views: 194, favorites: 107, inquiries: 44, trending: false },
    apartment: {
      societyName: "Prestige Gardens",
      towerBlock: "Tower D",
      maintenanceCharges: 7109,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "1BHK house for sale in Pune Koregaon Park. Excellent investment opportunity.",
    propertyType: "house",
    listingType: "sell",
    area: { value: 2740, unit: "sqft" },
    price: {
      amount: 9247500,
      display: "₹92L",
      negotiable: false,
      pricePerSqft: 3375,
    },
    owner: {
      id: "user_1046",
      name: "John Doe",
      phone: "+91-9802513608",
      email: "owner46@realestate.com",
      verified: false,
      type: "owner",
    },
    amenities: [
      "security",
      "gym",
      "swimming-pool",
      "lift",
      "power-backup",
      "intercom",
      "cctv",
    ],
    features: {
      furnished: "unfurnished",
      facing: "northeast",
      floorNumber: 18,
      totalFloors: 34,
      parking: { covered: 1, open: 1 },
      balconies: 4,
      age: "2-5 years",
      possession: "ready-to-move",
    },
    location: {
      address: "Sector 46, Heights",
      area: "Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      landmark: "Near Hospital",
      coordinates: { lat: 18.536, lng: 73.882 },
      nearby: {
        schools: ["Greenwood High - 1.5km"],
        hospitals: ["Max Healthcare - 2.8km"],
        malls: ["Cyber Hub - 800m"],
        metro: "Cyber City Metro - 1.8km",
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
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2026-04-23",
      immediatelyAvailable: false,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: { views: 204, favorites: 186, inquiries: 26, trending: true },
    apartment: {
      societyName: "DLF Homes",
      towerBlock: "Block 1",
      maintenanceCharges: 5128,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "3BHK house for sale in Gurgaon DLF Phase 1. Ready to move, unfurnished.",
    propertyType: "house",
    listingType: "sell",
    area: { value: 2266, unit: "sqft" },
    price: {
      amount: 9197694,
      display: "₹91L",
      negotiable: true,
      pricePerSqft: 4059,
    },
    owner: {
      id: "user_1049",
      name: "Pooja Nair",
      phone: "+91-9166816702",
      email: "owner49@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "club-house",
      "intercom",
      "power-backup",
      "cctv",
      "garden",
      "lift",
      "gym",
      "swimming-pool",
      "security",
      "fire-safety",
    ],
    features: {
      furnished: "unfurnished",
      facing: "north",
      floorNumber: 14,
      totalFloors: 38,
      parking: { covered: 2, open: 2 },
      balconies: 4,
      age: "0-1 year",
      possession: "ready-to-move",
    },
    location: {
      address: "Sector 81, Heights",
      area: "DLF Phase 1",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      landmark: "Near Railway Station",
      coordinates: { lat: 28.4595, lng: 77.0266 },
      nearby: {
        schools: ["Inventure Academy - 2.1km"],
        hospitals: ["Manipal Hospital - 3.2km"],
        malls: ["Nexus Shantiniketan - 900m"],
        metro: "Whitefield Metro - 2km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        isPrimary: true,
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
      availableFrom: "2026-01-06",
      immediatelyAvailable: true,
    },
    isFeatured: true,
    isVerified: false,
    isPremium: false,
    metrics: { views: 566, favorites: 27, inquiries: 2, trending: true },
    apartment: {
      societyName: "Emaar Properties",
      towerBlock: "Block 1",
      maintenanceCharges: 6775,
      maintenanceFrequency: "monthly",
    },
  },
  {
    description:
      "2BHK house for sale in Gurgaon DLF Phase 1. Great investment, 5-10 year old property.",
    propertyType: "house",
    listingType: "sell",
    area: { value: 3044, unit: "sqft" },
    price: {
      amount: 16236696,
      display: "₹162L",
      negotiable: true,
      pricePerSqft: 5334,
    },
    owner: {
      id: "user_1050",
      name: "Ananya Sharma",
      phone: "+91-9178228113",
      email: "owner50@realestate.com",
      verified: true,
      type: "owner",
    },
    amenities: [
      "parking",
      "security",
      "cctv",
      "fire-safety",
      "power-backup",
      "water-supply",
    ],
    features: {
      furnished: "unfurnished",
      facing: "southwest",
      floorNumber: 14,
      totalFloors: 14,
      parking: { covered: 0, open: 1 },
      balconies: 1,
      age: "5-10 years",
      possession: "ready-to-move",
    },
    location: {
      address: "Sector 21, Tower",
      area: "DLF Phase 1",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      landmark: "Near Shopping Complex",
      coordinates: { lat: 28.4595, lng: 77.0266 },
      nearby: {
        schools: ["DPS School - 1.2km"],
        hospitals: ["Fortis Hospital - 3km"],
        malls: ["Phoenix Mall - 500m"],
        metro: "Mansarovar Metro - 2.5km",
      },
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        isPrimary: true,
        caption: "Exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
        isPrimary: false,
        caption: "Dining Room",
      },
    ],
    status: "active",
    availability: {
      available: true,
      availableFrom: "2026-04-19",
      immediatelyAvailable: false,
    },
    isFeatured: true,
    isVerified: true,
    isPremium: false,
    metrics: { views: 642, favorites: 169, inquiries: 36, trending: false },
    apartment: {
      societyName: "K Raheja Corp",
      towerBlock: "Tower C",
      maintenanceCharges: 9294,
      maintenanceFrequency: "monthly",
    },
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const sanitized = rawData.map(sanitize);

    // Validate each doc first for clear error reporting
    let valid = [],
      invalid = 0;
    for (const prop of sanitized) {
      try {
        await new propertyModel(prop).validate();
        valid.push(prop);
      } catch (err) {
        invalid++;
        console.warn(
          `⚠️  Skipping invalid property: ${err.message.slice(0, 100)}`,
        );
      }
    }
    console.log(`✅ ${valid.length} valid | ⚠️  ${invalid} skipped`);

    await propertyModel.deleteMany({});
    console.log("🗑️  Cleared existing properties");

    const inserted = await propertyModel.insertMany(valid, { ordered: false });
    console.log(`🚀 Seeded ${inserted.length} properties to MongoDB`);

    const featured = inserted.filter((p) => p.isFeatured).length;
    console.log(`⭐ ${featured} featured properties available for Home page`);

    await mongoose.connection.close();
    console.log("🔒 Connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
