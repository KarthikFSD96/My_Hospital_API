// Connect to the database
require("./Config/database").connect();

//Define All Necessary Modules!!
const express = require("express");
const index = express();
const passport = require('passport');
const passportJWT = require('./Config/passport-jwt-strategy');

// Parse URL-encoded data using the 'express' middleware
index.use(express.urlencoded({ extended: false }));

// Import route modules
const doctorRoutes = require("./Routes/doctor");
const patientRoutes = require("./Routes/patient");
const reportRoutes = require("./Routes/report");

// Initialize Passport
index.use(passport.initialize());

// Define API routes
index.use("/api", doctorRoutes);
index.use("/api", patientRoutes);
index.use("/api", reportRoutes);

// Define the root route to display a simple webpage
index.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            align-items: center;
            justify-content: center;
            background-color: #303030;
            color: lightblue;
            height: 100vh;
            margin: 0;
          }
          h1 {
            font-size: 3rem;
            color: #2196F3; /* Change the title color to a blue shade */
          }
          a.button {
            background: #2196F3; /* Change the button background color to blue */
            color: white;
            text-decoration: none;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 5px;
            padding: 10px 20px;
            transition: background 0.3s; /* Add a smooth hover effect */
          }
          a.button:hover {
            background: #1976D2; /* Change the button background color on hover */
          }
          p {
            font-size: 2rem;
            margin: 0;
          }
        </style>
        <html>
        <head>
            <!-- Navbar -->
            <title>Hospital API</title>
            <link rel="icon" type="images/x-icon" href="https://static.vecteezy.com/system/resources/thumbnails/021/809/795/small/doctors-day-illustration-png.png" />
        </head>
        <!-- Content -->
        <body style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 85vh; margin: 0;">
            <h1 style="text-align: center;">Hospital API</h1>
            <a href="https://documenter.getpostman.com/view/30911569/2s9YXe8jZa" class="button" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Hospital API Documentation/Guide</a>
        </body>
        </html>        
  `);
});

// Define the port to listen on
const port = process.env.PORT || 6999;

// Start the API server
index.listen(port, () => {
  console.log(`The API is running on Port ${port} Successfully!!`);
});
