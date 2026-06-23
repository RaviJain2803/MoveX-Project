import mongoose from "mongoose";

const ConsignmentSchema = new mongoose.Schema(
  {
    email: {
      type: String,

      required: [true, "Email is required"],

      trim: true,

      lowercase: true,
    },

    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    category: {
      type: String,

      required: [true, "Category is required"],

      trim: true,
    },

    subcategory: {
      type: String,

      required: [true, "Sub Category is required"],

      trim: true,
    },

    pickup_location: {
      type: String,

      required: [true, "Pickup location required"],

      trim: true,
    },

    destination: {
      type: String,

      required: [true, "Destination required"],

      trim: true,
    },

    description: {
      type: String,

      required: [true, "Description required"],

      trim: true,

      maxlength: 500,
    },

    trackingId: {
      type: String,

      unique: true,
    },

    status: {
      type: String,

      enum: [
        "PENDING",

        "CONFIRMED",

        "PACKING",

        "IN_TRANSIT",

        "DELIVERED",

        "CANCELLED",
      ],

      default: "PENDING",
    },

    createdAt: {
      type: Date,

      default: Date.now,
    },

    updatedAt: {
      type: Date,

      default: Date.now,
    },
  },

  {
    versionKey: false,
  },
);

const ConsignmentSchemaModel = mongoose.model(
  "OrderDetails",

  ConsignmentSchema,
);

export default ConsignmentSchemaModel;
