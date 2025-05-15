import Patient from "../models/patientModel.js";


// ➕ Create Patient
const createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 📄 Get All Patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔍 Get One Patient
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('visits.doctorId visits.departmentId');
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📝 Update Patient
const updatePatient = async (req, res) => {
    try {
        const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ❌ Delete Patient
const deletePatient = async (req, res) => {
    try {
        const deleted = await Patient.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addVisit = async (req, res) => {
    try {
        const { patientId } = req.params;

        const prescriptionImageUrl = req.file?.path || req.file?.secure_url || null;

        const visit = {
            doctorId: req.body.doctorId,
            departmentId: req.body.departmentId,
            visitDate: req.body.visitDate,
            diagnosis: req.body.diagnosis,
            notes: req.body.notes,
            prescriptionImageUrl,
        };

        const updatedPatient = await Patient.findByIdAndUpdate(
            patientId,
            { $push: { visits: visit } },
            { new: true }
        ).populate('visits.doctorId visits.departmentId');

        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error in addVisit:', error);
        res.status(400).json({ error: error.message });
    }
};
  
export {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    addVisit
};