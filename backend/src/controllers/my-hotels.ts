import { Request, Response } from "express"
import cloudinary from "cloudinary"
import Hotel from "../models/hotel";
import { HotelType } from "../models/hotel";

// @desc    Create hotel
// @route   POST /api/my-hotels
// @access  Private
export const createHotel = async (req: Request, res: Response) => {
    try {
        // `req.files` contains an array of image files uploaded via the `multer` middleware.
        // Type assertion to ensure it's recognized as an array of `Express.Multer.File` objects.
        const imageFiles = req.files as Express.Multer.File[]
        // `newHotel` is initialized with the body data sent in the request.
        const newHotel: HotelType = req.body

        // Upload each image to Cloudinary and return an array of upload promises.
        const uploadPromises = imageFiles.map(async (image) => {
            // Convert image buffer to base64 string
            const b64 = Buffer.from(image.buffer).toString("base64")
            // Construct a data URI (format required by Cloudinary
            let dataURI = `data:${image.mimetype};base64,${b64}`
            // Upload the image to Cloudinary and return the URL of the uploaded image
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

// @desc    Get all hotels
// @route   GET /api/my-hotels
// @access  Private
export const getAllHotels = async (req: Request, res: Response) => {

    try {
        const hotels = await Hotel.find({ userId: req.userId })

        // if (hotels.length === 0) {
        //     return res.status(200).json({ message: "No hotels to fetch" })
        // }

        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" })
    }
}