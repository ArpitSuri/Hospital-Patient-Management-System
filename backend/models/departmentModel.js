import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true, // Add this to specify department's focus area
    },
    image: {
        type: String, // URL of the department image (can be used for profile pic or logo)
        required: true,
    },
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
