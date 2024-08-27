import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth";
import { createHotel, editHotel, getAllHotels } from "../controllers/my-hotels";
import { body } from "express-validator";

const router = express.Router()

// Configures multer to store uploaded files in memory as buffers
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

router.post("/", verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
], upload.array("imageFiles", 6), createHotel)

router.get("/", verifyToken, getAllHotels)
router.get("/:id", verifyToken, editHotel)

export default router