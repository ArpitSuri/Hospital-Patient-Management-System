import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    patientEmail: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "visited", "deleted"],
        default: "pending",
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
