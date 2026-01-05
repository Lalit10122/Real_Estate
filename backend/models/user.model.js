import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isBuyer: {
      type: Boolean,
      required: true,
      default: true, // true = buyer, false = seller
    },
    propertyDataId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Property", // Reference to Property model
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { 
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

// Index for faster email lookups
userSchema.index({ email: 1 });

// Virtual to get property count
userSchema.virtual("propertyCount").get(function () {
  return this.propertyDataId.length;
});

// Method to check if user is a seller
userSchema.methods.isSeller = function () {
  return this.isBuyer === false;
};

// Method to add property to user's list
userSchema.methods.addProperty = async function (propertyId) {
  if (!this.propertyDataId.includes(propertyId)) {
    this.propertyDataId.push(propertyId);
    await this.save();
  }
  return this;
};

// Method to remove property from user's list
userSchema.methods.removeProperty = async function (propertyId) {
  this.propertyDataId = this.propertyDataId.filter(
    (id) => id.toString() !== propertyId.toString()
  );
  await this.save();
  return this;
};

// Don't return password in JSON responses
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;