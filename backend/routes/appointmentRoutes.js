import express from 'express';
import { createAppointment, deleteAppointment, getAppointments, updateAppointmentStatus } from '../controller/appointmentController.js';



const router = express.Router();
// Route to get all appointments
router.get('/', getAppointments);
// Route to create a new appointment
router.post('/', createAppointment);
// Route to delete an appointment by ID
router.delete('/:id', deleteAppointment);

// Route to update appointment status
router.put('/:id/status', updateAppointmentStatus);
// Export the router
export default router;
