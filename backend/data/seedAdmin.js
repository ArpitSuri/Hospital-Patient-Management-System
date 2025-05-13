import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
        if (existingAdmin) {
            console.log("Admin already exists.");
            return process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = new Admin({
            name: "Super Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin",
            profilePic: "https://unsplash.com/photos/macbook-pro-white-ceramic-mugand-black-smartphone-on-table-cckf4TsHAuw",
        });

        await admin.save();
        console.log("Admin seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedAdmin();
