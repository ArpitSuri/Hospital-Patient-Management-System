import upload from "../patientMulter.js";
import express from "express";
import { addVisit, createPatient, deletePatient, getAllPatients, getPatientById, updatePatient } from "../controller/patientController.js";
const router = express.Router();


router.post('/',  createPatient);
router.get('/',  getAllPatients);
router.get('/:id',  getPatientById);
router.put('/:id',  updatePatient);
router.delete('/:id',  deletePatient);

// Add Visit to Patient
router.post('/:patientId/add-visit', upload.single('prescriptionImage'),addVisit); // Already defined earlier


export default router;