import mongoose from "mongoose";
import dotenv from "dotenv";
import Department from "../models/departmentModel.js";
import Doctor from "../models/doctorModel.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        // Clear old data
        await Department.deleteMany();
        await Doctor.deleteMany();

        // Seed departments with specialization and image URLs
        const departments = await Department.insertMany([
            { name: "Cardiology", specialization: "Heart Health", image: "https://example.com/cardiology.jpg" },
            { name: "Neurology", specialization: "Brain & Nerve Health", image: "https://example.com/neurology.jpg" },
            { name: "Orthopedics", specialization: "Bones & Joints", image: "https://example.com/orthopedics.jpg" },
            { name: "Pediatrics", specialization: "Child Health", image: "https://example.com/pediatrics.jpg" },
        ]);

        // Seed doctors with specialization, profile image, and available slots
        const doctors = await Doctor.insertMany([
            {
                name: "Dr. A Sharma",
                department: departments[0]._id, // Cardiology
                specialization: "Cardiologist",
                profileImage: "https://example.com/dr-a-sharma.jpg",
                availableSlots: [
                    new Date("2025-05-15T09:00:00"),
                    new Date("2025-05-15T14:00:00"),
                ],
            },
            {
                name: "Dr. B Verma",
                department: departments[1]._id, // Neurology
                specialization: "Neurologist",
                profileImage: "https://example.com/dr-b-verma.jpg",
                availableSlots: [
                    new Date("2025-05-16T10:00:00"),
                    new Date("2025-05-16T13:00:00"),
                ],
            },
            {
                name: "Dr. C Rao",
                department: departments[2]._id, // Orthopedics
                specialization: "Orthopedic Surgeon",
                profileImage: "https://example.com/dr-c-rao.jpg",
                availableSlots: [
                    new Date("2025-05-17T08:00:00"),
                    new Date("2025-05-17T12:00:00"),
                ],
            },
            {
                name: "Dr. D Patel",
                department: departments[3]._id, // Pediatrics
                specialization: "Pediatrician",
                profileImage: "https://example.com/dr-d-patel.jpg",
                availableSlots: [
                    new Date("2025-05-18T11:00:00"),
                    new Date("2025-05-18T15:00:00"),
                ],
            },
        ]);

        console.log("✅ Data Seeded Successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error Seeding Data", error);
        process.exit(1);
    }
};

seedData();
