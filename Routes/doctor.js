//Define All Necessary Modules!!
const express = require('express');
const router = express.Router();
const {createDoctor, createSession} = require('../Controllers/doctor');

// Register a doctor - POST request to "/doctors/register"
router.post("/doctors/register", createDoctor);

// Log in a doctor - POST request to "/doctors/login"
router.post('/doctors/login', createSession);

// Export the Router module
module.exports = router;