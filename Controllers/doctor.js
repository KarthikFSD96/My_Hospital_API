//Define All Necessary Modules!!
const Doctor = require("../Models/doctor");
const jwt = require("jsonwebtoken");

// Register a new doctor
module.exports.createDoctor = async (req, res) => {
  try {
    // Check if password and confirm password match
    const { password, confirm_password } = req.body;
    if (password != confirm_password) {
      return res.status(200).json({
        message: "Passwords Did Not Match, Please Try Again!!",
      });
    }
    // Find the doctor using the name before signing up to check if the username/doctor is already registered!!
    let doctor = await Doctor.findOne({ name: req.body.name });

    // If doctor doesn't exist, create the doctor
    if (!doctor) {
    await Doctor.create(req.body);
    return res.status(200).json({
    message: `Dr.${req.body.name} Registered Successfully!!`, // Use backticks for string interpolation
    });
  } else {
      // If the Doctor already exists, return a 422 Unprocessable Entity response
      return res.status(422).json({
        message: `Dr.${req.body.name} Already Exists!!`,
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

// Log in as a doctor
module.exports.createSession = async (req, res) => {
  try {
    // Find the doctor using the name
    let doctor = await Doctor.findOne({ name: req.body.name });
    if (!doctor) {
      // If the username is invalid, return a 422 Unprocessable Entity response
      return res.status(422).json({
        message: "Invalid Username",
      });
    }
    // Check if the provided password matches the stored password
    let isValid = await doctor.isValidPassword(req.body.password);
    if (!isValid) {
      // If the password is invalid, return a 422 Unprocessable Entity response
      return res.status(422).json({
        message: "Invalid Password!!",
      });
    }

    // If doctor exists and passwords match, log in and generate a JWT token
    return res.status(200).json({
      message: `Dr.${req.body.name} Signed-in Successfully!!`,
      doctorID: doctor._id,
      Name: doctor.name,
      data: {
        token: jwt.sign(doctor.toJSON(), process.env.SECRET, {
          expiresIn: "1h",
        }),
      },
    });
  } catch (err) {
    // Handle any errors that may occur during the process
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};
