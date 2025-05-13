import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Emulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define upload directory path
const uploadDir = path.join(__dirname, "uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Ensure recursive creation if necessary
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

// Set up multer upload
const upload = multer({ storage });

// Export upload middleware
export default upload;
