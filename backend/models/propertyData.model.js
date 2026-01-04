import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["flat", "house", "villa", "plot", "commercial", "pg", "office"],
      lowercase: true,
    },
    listingType: {
      type: String,
      required: true,
      enum: ["sell", "rent", "lease"],
      lowercase: true,
    },
    area: {
      value: {
        type: Number,
        required: true,
        min: 1,
      },
      unit: {
        type: String,
        required: true,
        enum: ["sqft", "sqm", "sqyd", "acre", "hectare"],
        default: "sqft",
      },
    },
    price: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      display: {
        type: String,
        trim: true,
      },
      negotiable: {
        type: Boolean,
        default: false,
      },
      pricePerSqft: {
        type: Number,
        min: 0,
      },
    },
    owner: {
      id: {
        type: String,
        required: true,
        index: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        required: true,
        enum: ["owner", "dealer", "builder", "agent"],
        default: "owner",
      },
    },
    amenities: {
      type: [String],
      default: [],
      enum: [
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
      ],
    },
    features: {
      furnished: {
        type: String,
        enum: ["furnished", "semi-furnished", "unfurnished"],
        default: "unfurnished",
      },
      facing: {
        type: String,
        enum: [
          "north",
          "south",
          "east",
          "west",
          "north-east",
          "north-west",
          "south-east",
          "south-west",
        ],
        lowercase: true,
      },
      floorNumber: {
        type: Number,
        min: 0,
      },
      totalFloors: {
        type: Number,
        min: 1,
      },
      parking: {
        covered: {
          type: Number,
          default: 0,
          min: 0,
        },
        open: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
      balconies: {
        type: Number,
        default: 0,
        min: 0,
      },
      age: {
        type: String,
        enum: ["0-1", "1-2", "2-5", "5-10", "10+", "under-construction"],
      },
      possession: {
        type: String,
        enum: ["ready-to-move", "under-construction"],
        default: "ready-to-move",
      },
    },
    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },
      area: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      landmark: {
        type: String,
        trim: true,
      },
      coordinates: {
        lat: {
          type: Number,
          min: -90,
          max: 90,
        },
        lng: {
          type: Number,
          min: -180,
          max: 180,
        },
      },
      nearby: {
        schools: [String],
        hospitals: [String],
        malls: [String],
        metro: String,
        airports: [String],
        restaurants: [String],
        banks: [String],
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
        caption: {
          type: String,
          trim: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "sold", "rented", "pending", "draft"],
      default: "active",
      index: true,
    },
    availability: {
      available: {
        type: Boolean,
        default: true,
      },
      availableFrom: {
        type: Date,
      },
      immediatelyAvailable: {
        type: Boolean,
        default: false,
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
      index: true,
    },
    metrics: {
      views: {
        type: Number,
        default: 0,
        min: 0,
      },
      favorites: {
        type: Number,
        default: 0,
        min: 0,
      },
      inquiries: {
        type: Number,
        default: 0,
        min: 0,
      },
      trending: {
        type: Boolean,
        default: false,
      },
    },
    apartment: {
      societyName: {
        type: String,
        trim: true,
      },
      towerBlock: {
        type: String,
        trim: true,
      },
      maintenanceCharges: {
        type: Number,
        min: 0,
      },
      maintenanceFrequency: {
        type: String,
        enum: ["monthly", "quarterly", "yearly", "one-time"],
        default: "monthly",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
propertySchema.index({ "location.city": 1, "location.area": 1 });
propertySchema.index({ propertyType: 1, listingType: 1 });
propertySchema.index({ "price.amount": 1 });
propertySchema.index({ createdAt: -1 });
propertySchema.index({
  "location.coordinates.lat": 1,
  "location.coordinates.lng": 1,
});

// Virtual for calculating total parking spaces
propertySchema.virtual("features.totalParking").get(function () {
  return (
    (this.features.parking?.covered || 0) + (this.features.parking?.open || 0)
  );
});

// Pre-save middleware to calculate pricePerSqft if not provided
propertySchema.pre("save", function (next) {
  if (this.price.amount && this.area.value && !this.price.pricePerSqft) {
    this.price.pricePerSqft = Math.round(this.price.amount / this.area.value);
  }
  next();
});

// Pre-save middleware to ensure only one primary image
propertySchema.pre("save", function (next) {
  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter((img) => img.isPrimary);
    if (primaryImages.length === 0) {
      // If no primary image, make the first one primary
      this.images[0].isPrimary = true;
    } else if (primaryImages.length > 1) {
      // If multiple primary images, keep only the first one as primary
      this.images.forEach((img, index) => {
        img.isPrimary = index === 0;
      });
    }
  }
  next();
});

// Instance method to increment views
propertySchema.methods.incrementViews = function () {
  this.metrics.views += 1;
  return this.save();
};

// Instance method to increment favorites
propertySchema.methods.incrementFavorites = function () {
  this.metrics.favorites += 1;
  return this.save();
};

// Instance method to increment inquiries
propertySchema.methods.incrementInquiries = function () {
  this.metrics.inquiries += 1;
  return this.save();
};

// Static method to find featured properties
propertySchema.statics.findFeatured = function () {
  return this.find({ isFeatured: true, status: "active" }).sort({
    createdAt: -1,
  });
};

// Static method to find trending properties
propertySchema.statics.findTrending = function () {
  return this.find({ "metrics.trending": true, status: "active" }).sort({
    "metrics.views": -1,
  });
};

// Static method to search by location
propertySchema.statics.searchByLocation = function (city, area) {
  const query = { status: "active" };
  if (city) query["location.city"] = new RegExp(city, "i");
  if (area) query["location.area"] = new RegExp(area, "i");
  return this.find(query);
};

const propertyModel = mongoose.model("Property", propertySchema);

export default propertyModel;
