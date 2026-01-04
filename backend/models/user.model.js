import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBuyer: {
      type: Boolean,
    },
    propertyDataId: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);   

const userModel = mongoose.model("User", userSchema); //m s c

export default userModel;
