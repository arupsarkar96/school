import { Router } from "express";
import { adminAndStaffAuthorize } from "../middleware/auth";
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import path from "path"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // e.g., .pdf, .jpg
        const uniqueName = `${uuidv4()}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

const uploadRouter = Router()

uploadRouter.post("/", adminAndStaffAuthorize, upload.single("file"), (req, res) => {
    res.json({ url: `https://vidyalay.messant.in/uploads/${req.file?.filename}`, path: req.file?.path });
})


export default uploadRouter