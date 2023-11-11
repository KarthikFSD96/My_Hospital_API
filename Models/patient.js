//Define All Necessary Modules!!
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { String } = mongoose.Schema.Types;

// Define the patient schema
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: ObjectId,
        ref: "Report", // References the "Report" model
      },
    ],
  },
  {
    timestamps: true, // Automatically add created_at and updated_at timestamps
  }
);

// Export the Patient model
const Patient = (module.exports = mongoose.model("Patient", patientSchema));
