import Appointment from "../models/appointmentModel.js";
import sendEmail from "../utils/sendEmail.js";

const createAppointment = async (req, res) => {
    try {
        const { patientName, patientEmail, department, doctor, appointmentDate, message } = req.body;
        const newAppointment = new Appointment({
            patientName,
            patientEmail,
            department,
            doctor,
            appointmentDate,
            message,
        });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("doctor", "name")
            .populate("department", "name");
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };


const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate allowed statuses
        if (!["pending", "confirmed", "visited", "deleted"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        appointment.status = status;
        await appointment.save();

        // Send email to patient
        const emailSubject = `Your Appointment Status is now: ${status.toUpperCase()}`;
        const emailBody = `
        Dear ${appointment.patientName},<br/><br/>
        Your appointment scheduled on <b>${appointment.appointmentDate.toLocaleString()}</b> has been <b>${status}</b>.<br/><br/>
        Thank you,<br/>
        Hospital Management Team
      `;

        await sendEmail(appointment.patientEmail, emailSubject, emailBody);

        res.json({ message: `Appointment ${status} and email sent.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


export { createAppointment, getAppointments, deleteAppointment , updateAppointmentStatus };


