# Hospital API

[My Hospital API Hosted on Render] - [URL](https://my-hospital-api.onrender.com)

## Introduction

Welcome to the Hospital API, a solution designed to support the healthcare heroes battling COVID-19. This API, built with MongoDB, Express.js, Node.js, and JavaScript, is dedicated to the well-being of patients and the tireless efforts of doctors. Let's explore its functionality and how to get started.

## Functionality

- **User Types:**
    - Doctors
    - Patients

- **For Doctors:**
    - Secure login
    - Streamlined patient visits:
        - Patient registration using name, with the API returning patient information if already registered.
        - Report creation with essential details, including the doctor's identity, patient status (Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit), and the date of the report.

- **For Patients:**
    - Easy self-registration, simplifying onboarding.
    - Providing personal and medical information grants access to healthcare services and appointment scheduling.

## Getting Started

1. Clone the repository to your local system.
2. Create a .env file in the root directory and add the following configurations:
   - `PORT="Your Specific Port Number Of Your Choice!!"`
   - `MONGODB_URL="Your MongoDB URL"`
   - `SESSION_SECRET_KEY="Your Secret Session Key Of Your Choice!!"`
3. Install all required packages:
   ```bash
   npm install
   ```
4. Run the project:
   ```bash
   npm start
   ```
The project is running on the port number you provided.

## Routes in Hospital-API

- `/Doctors/Register` → Register doctors with name and password.
- `/Doctors/Login` → Returns the JWT for authentication.
- `/Patients/Register` → Patient registration.
- `/Patients/:id/Create_Report` → Create patient reports.
- `/Patients/:id/All_Reports` → List all patient reports, sorted from oldest to latest.
- `/Reports/:Status` → List all reports of patients filtered by a specific status.

## Tools Used

- Node.js
- MongoDB
- Express.js

### Libraries

- dotenv
- express
- express-session
- jsonwebtoken
- nodemon
- mongoose
- passport
- passport-jwt
- mongodb
- bcryptjs