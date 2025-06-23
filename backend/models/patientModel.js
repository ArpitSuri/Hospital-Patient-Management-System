import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    visitDate: { type: Date, default: Date.now },
    diagnosis: String,
    notes: String,
    prescriptionImageUrl: String,
    toothNumbers: [String],
});

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    contact: String,
    address: String,
    visits: [visitSchema], // Embedded array of visits
    createdAt: { type: Date, default: Date.now }
});


const Patient = mongoose.model("Patient" , patientSchema);
export default Patient;

