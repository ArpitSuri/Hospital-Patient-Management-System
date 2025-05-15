import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load env vars if not using Vercel's dashboard env system

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage to directly upload to Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads", // Cloudinary folder
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
    },
});

// Multer upload middleware
const upload = multer({ storage });

export default upload;
