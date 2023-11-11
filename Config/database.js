//Define All Necessary Modules!!
const mongoose = require("mongoose");
require("dotenv").config();

// Function to connect to MongoDB
exports.connect = () => {
  // Disable strict query mode
  mongoose.set("strictQuery", false);
  
  // Attempt to connect to MongoDB
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to MongoDB Successfully!!")) // If connection is successful, log a success message
    .catch((err) => {
      console.log("Connection to MongoDB failed, Please try again!!"); // If connection fails, log an error message
      console.log(err); // Log the error details
      process.exit(1); // Exit the process with an error code
    });
};
