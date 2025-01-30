import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto"; // For generating unique filenames

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define upload directory
const uploadDir = path.join(__dirname, "../uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed file extensions
const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf"];

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return callback(new Error("Invalid file type. Allowed: " + allowedExtensions.join(", ")));
    }

    // Generate a unique filename using crypto.randomUUID()
    const uniqueName = crypto.randomUUID();
    callback(null, `${uniqueName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return callback(new Error("Invalid file type"));
    }
    callback(null, true);
  },
});

export default upload;
