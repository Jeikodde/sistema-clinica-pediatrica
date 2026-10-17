const express = require('express');
const router = express.Router();
const { addPatient, deletePatient, getPatients, updatePatient } = require('../controllers/patientController');

// Get patients
router.get('/', getPatients);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;