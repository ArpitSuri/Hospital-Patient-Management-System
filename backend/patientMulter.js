// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// // Emulate __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Define upload directory path
// const uploadDir = path.join(__dirname, "patientUploads");

// // Create uploads directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true }); // Ensure recursive creation if necessary
// }

// // Configure multer storage
// const storage = multer.memoryStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         const ext = path.extname(file.originalname);
//         cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//     },
// });

// // Set up multer upload
// const upload = multer({ storage });

// // Export upload middleware
// export default upload;


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
        folder: "patientUploads", // Cloudinary folder
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
    },
});

// Multer upload middleware
const upload = multer({ storage });

export default upload;
