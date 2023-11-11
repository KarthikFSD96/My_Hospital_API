//Define All Necessary Modules!!
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Doctor = require("../Models/doctor");

// Define options for JWT authentication
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Extract JWT from the Bearer token in the request
  secretOrKey: process.env.SECRET, // Use the secret key from environment variables
};

// Authenticate using JWT
passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    // Find the Doctor based on the JWT payload's user ID
    Doctor.findById(jwtPayload._id, (err, user) => {
      if (err) {
        console.log("Error in finding Doctor");
        return;
      }

      // If Doctor found, return the user
      if (user) {
        return done(null, user);
      } else {
        // If Doctor not found, return false
        return done(null, false);
      }
    });
  })
);

//Export All Necessary Modules!!
module.exports = passport;
