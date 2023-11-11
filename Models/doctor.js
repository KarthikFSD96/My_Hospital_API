//Define All Necessary Modules!!
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the doctor schema
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String, // Optional field to store the salt (if needed)
  },
  {
    timestamps: true, // Automatically add created_at and updated_at timestamps
  }
);

// Encrypting the password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password using bcrypt with a strength factor of 10
  this.password = await bcrypt.hash(this.password, 10);
});

// Verifying the password
doctorSchema.methods.isValidPassword = async function (userSentPassword) {
  // Compare the user-sent password with the stored hashed password
  return await bcrypt.compare(userSentPassword, this.password);
};

// Export the Doctor model with the defined schema
module.exports = mongoose.model("Doctor", doctorSchema);
