import { Request, Response } from "express"
import cloudinary from "cloudinary"
import Hotel, { HotelType } from "../models/hotel";

// @desc    Create hotel
// @route   POST /api/my-hotels
// @access  Private
export const createHotel = async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[]
        const newHotel: HotelType = req.body

        // Upload the imgs to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64")
            let dataURI = `data:${image.mimetype};base64,${b64}`
            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.url
        })

        // If upload was successful, add the URLs to the new hotel
        const imageUrls = await Promise.all(uploadPromises)
        newHotel.imageUrls = imageUrls
        newHotel.lastUpdated = new Date()
        newHotel.userId = req.userId

        // Save the new hotel in our DB
        const hotel = new Hotel(newHotel)
        hotel.save()

        // Return a 201 status
        res.status(201).send(hotel)
    } catch (e) {
        console.log(`Error creating hotel: ${e}`);
        res.status(500).json({ message: "Something went wrong" })
    }
}