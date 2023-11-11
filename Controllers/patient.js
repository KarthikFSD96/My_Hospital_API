//Define All Necessary Modules!!
const Patient = require("../Models/patient");
const Report = require("../Models/report");

// Registering patients
module.exports.register = async (req, res) => {
  try {
    // Check if patient is already registered
    let patient = await Patient.findOne({ name: req.body.name });

    // If the patient doesn't exist, create the patient
    if (!patient) {
      let patient = await Patient.create(req.body);
      return res.status(200).json({
        // If the patient doesn't exist, create a patient and return a 200 OK response
        message: `Patient ${patient.name} Registered Successfully`,
        patientId: patient._id,
        name: patient.name,
      });
    } else {
      // If the patient is already existing, return a 422 Unprocessable Entity response
      return res.status(422).json({
        message: `A Patient Already Exists With This Name - ${patient.name}`,
        patientId: patient._id,
        name: patient.name,
      });
    }
  } catch (err) {
    console.log(err);
    // Handle any errors that may occur during the process
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};

// Creating a report for patient
module.exports.createReport = async (req, res) => {
  try {
    // Check if the patient is available
    let patient = await Patient.findById(req.params.id);

    // If the patient is present, create a report for the patient
    if (patient) {
      // Create a report data object with the information from the request
      let reportData = {
        doctor: req.body.doctor,  // Get the doctor from the request body
        patient: req.params.id,   // Get the params from the request id
        status: req.body.status,  // Get the status from the request body
        date: req.body.date,      // Get the date from the request body
      };
      
      // Create a new report in the database using the reportData
      let report = await Report.create(reportData);

      // Add the created report to the patient's list of reports and save the patient
      patient.reports.push(report);
      patient.save();

      return res.status(200).json({
        // If the patient report doesn't exist, create a patient report and return a 200 OK response
        message: `Patient ${req.body.name} Report Created Successfully!!`,
      });
      
    } else {
      // If the patient is not found, return a 422 Unprocessable Entity response
      return res.status(422).json({
        message: `Patient ${req.body.name} Registration Failed!!`,
      });
    }
  } catch (err) {
    // Handle any errors that may occur during the process
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};

//generating all the reports of the user
module.exports.allReports = async (req, res) => {
  try {
    //find patient and populate report
    let patient = await Patient.findById(req.params.id).populate({
      path: "reports",
      populate: { path: "doctor", select: "name _id" },
    });

    if (patient) {
      // Fetch all the patient reports by name, if it exists & return a 200 OK response
      return res.status(200).json({
        message: `Here are the Reports of - ${req.body.name}`,
        reports: patient.reports,
      });
    } else {
      // If the patient is not registered, return a 422 Unprocessable Entity response
      return res.status(422).json({
        message: `Patient ${req.body.name} is not Registered!!`,
      });
    }
  } catch (err) {
    // Handle any errors that may occur during the process
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
