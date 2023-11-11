//Define All Necessary Modules!!
const Report = require("../Models/report");

// Generate reports based on status
// Possible status values: Positive, Negative, Quarantine, Travelled
module.exports.status = async (req, res) => {
  try {
    // Find reports with the specified status and populate patient and doctor information
    let report = await Report.find({ status: req.params.status })
      .populate({
        path: "patient",
        select: "name city mobile_number",
      })
      .populate({
        path: "doctor",
        select: "name _id name",
      });

    if (report && report.length !== 0) {
      return res.status(200).json({
        // List all the reports with specific status and return a 200 OK response
        message: `List of all the reports with ${req.params.status}`,
        reports: report,
      });
    } else {
      return res.status(422).json({
        // If there are no such patients with a specified status, return a 422 Unprocessable Entity response
        message: `There are no such patients with ${req.params.status} status`,
      });
    }
  } catch (err) {
    console.log(err.message);
    // Handle any errors that may occur during the process
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
