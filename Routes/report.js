//Define All Necessary Modules!!
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import the report controller
const { status } = require("../Controllers/report");

// Fetching all the reports with a specific status - GET request to "/reports/:status"
router.get(
  "/reports/:status",
  passport.authenticate("jwt", { session: false }),
  status
);

// Export the Router module
module.exports = router;