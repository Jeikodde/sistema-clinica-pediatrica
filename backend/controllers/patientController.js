const Patient = require('../models/patient');

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

// New Patient
exports.addPatient = async (req, res) => {
  const { name } = req.body;
  const patient = new Patient({ name });

  try {
    await patient.save();
    res.status(200).json(patient);
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

// Update Patient
exports.updatePatient = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const patient = await Patient.findByIdAndUpdate(id, { name }, { new: true });
    
    if(!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(201).json(patient);
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete Patient
exports.deletePatient = async (req, res) => {
  const {id } = req.params;

  try {
    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: 'Patient deleted' });
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}