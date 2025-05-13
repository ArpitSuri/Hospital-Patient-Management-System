import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    specialization: {
        type: String, // Specific specialization of the doctor
        required: true,
    },
    profileImage: {
        type: String, // URL for the doctor's profile image
        required: true,
    },
    availableSlots: [
        {
            type: Date, // Time slots when doctor is available
        },
    ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
