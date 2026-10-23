const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('SERVER-NAME')
    .then( () => console.log('Connection to mongodb successfully'))
    .catch( (error) => console.error('Error to connect to mongodb', error))

// Define routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Patients routes
const patientRoutes = require('./routes/patients');
app.use('/api/patient', patientRoutes);

// Configure server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

