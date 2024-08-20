import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
import path from "path"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
// Parses cookies attached to the client request object, making them available under `req.cookies`
app.use(cookieParser())
// Parses incoming requests with JSON payloads and makes the data available in `req.body`
app.use(express.json())
// Parses incoming form data and puts it in `req.body`
// The `extended: true` option allows for more complex data structures
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    // Enables Cross-Origin Resource Sharing (CORS) to allow requests from the specified frontend URL
    origin: process.env.FRONTEND_URL,
    // Allows the frontend to send cookies and other credentials with requests
    credentials: true,
}))

// Serve static files from the frontend's build directory (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
        app.listen(3000, () => {
            console.log(`server running on PORT 3000`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

startServer()


