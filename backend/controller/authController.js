import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check user existence
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // If user exists but not verified
        

        // If verified → proceed with login
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
                profilePic: user.profilePic,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
            role: user.role,
            userId: user._id,
        });

    } catch (error) {
        console.error("Manual login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
  