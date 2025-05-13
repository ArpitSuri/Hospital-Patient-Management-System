import Doctor from "../models/doctorModel.js";
import fs from "fs";

export const createDoctor = async (req, res) => {
    try {
        const { name, department, specialization } = req.body;
        const profileImage = req.file?.filename;

        const newDoctor = new Doctor({
            name,
            department,
            specialization,
            profileImage,
        });

        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        console.error("Create Doctor Error:", error); // Add this
        res.status(500).json({ error: "Error creating doctor" });
    }
};

export const getAllDoctors = async (req, res) => {
    const doctors = await Doctor.find().populate("department");
    res.json(doctors);
};

export const deleteDoctor = async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    if (doctor.profileImage) {
        fs.unlink(`uploads/${doctor.profileImage}`, () => { });
    }

    await doctor.deleteOne();
    res.json({ message: "Doctor deleted" });
};

export const updateDoctor = async (req, res) => {
    const { name, department, specialization } = req.body;
    const profileImage = req.file?.filename;

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    if (profileImage && doctor.profileImage) {
        fs.unlink(`uploads/${doctor.profileImage}`, () => { });
    }

    doctor.name = name || doctor.name;
    doctor.department = department || doctor.department;
    doctor.specialization = specialization || doctor.specialization;
    if (profileImage) doctor.profileImage = profileImage;

    await doctor.save();
    res.json(doctor);
};

export const getDoctorsByDepartment = async (req, res) => {
    const { departmentId } = req.params;
    try {
        const doctors = await Doctor.find({ department: departmentId });
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors by department:", error);
        res.status(500).json({ error: "Internal server error" });
    }
  };