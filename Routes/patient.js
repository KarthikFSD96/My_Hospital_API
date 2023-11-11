//Define All Necessary Modules!!
const express = require("express");
const router = express.Router();
const passport = require('passport');
const Patient = require("../Models/patient");

// Import the patient controller
const {
  register,
  createReport,
  allReports,
} = require("../Controllers/patient");

// Show all the patients route - GET request to "/patients"
router.get(
  "/patients",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const patient = await Patient.find({});
    return res.send(patient);
  }
);

// Registering a patient - POST request to "/patients/register"
router.post(
  "/patients/register",
  passport.authenticate("jwt", { session: false }),
  register
);

// Create a patient report - POST request to "/patients/:id/create_report"
router.post(
  "/patients/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  createReport
);

// Get all reports of a particular patient - GET request to "/patients/:id/all_reports"
router.get(
  "/patients/:id/all_reports",
  passport.authenticate("jwt", { session: false }),
  allReports
);

// Export the Router module
module.exports = router;
