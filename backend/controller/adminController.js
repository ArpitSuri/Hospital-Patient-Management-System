import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";
import Patient from "../models/patientModel.js";


export const getAdminStats = async (req, res) => {
    try {
        const appointments = await Appointment.countDocuments();
        const visits = await Appointment.countDocuments({ status: "visited" });
        const patients = await Patient.countDocuments();
        const doctors = await Doctor.countDocuments();

        res.status(200).json({ appointments, visits, patients, doctors });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};
