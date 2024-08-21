import express from "express";
import { Request, Response } from "express"
import multer from "multer";
import cloudinary from "cloudinary"

const router = express.Router()

// Configures multer to store uploaded files in memory as buffers
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

router.post("/", upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[]
        const newHotel = req.body

        // Upload the imgs to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64")
            let dataURI = `data:${image.mimetype};base64,${b64}`
            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.url
        })

        const imageUrls = await Promise.all(uploadPromises)

        // If upload was successful, add the URLs to the new hotel


        // Save the new hotel in our DB
        // Return a 201 status
    } catch (e) {
        console.log(`Error creating hotel: ${e}`);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router