import express from "express"
import { check } from "express-validator";
import { registerUser } from "../controllers/users";

const router = express.Router()

router.post("/register", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    check("firstName", "Fist Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
], registerUser)

export default router

