//Define All Necessary Modules!!
const mongoose = require("mongoose");
const { String } = mongoose.Schema.Types;

// Define the report schema
const reportSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      ref: "Doctor", // References the "Doctor" model
    },
    patient: {
      type: String,
      ref: "Patient", // References the "Patient" model
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add created_at and updated_at timestamps
  }
);

// Export the Report model
module.exports = mongoose.model("Report", reportSchema);
