import { Request, Response } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Check if password matches by hashing the password passed in
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        })

        // Store token in HTTP-only cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })

        return res.status(200).json({ userId: user._id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

/*************************
- This function handles user login by validating credentials and issuing a JWT if successful
- It checks for input errors and verifies the user's email and password against the database
- If valid, it generates a JWT with the user’s ID, stores it in an HTTP-only cookie, and returns the user ID
- The function ensures secure authentication and provides feedback based on the login outcome
*************************/

