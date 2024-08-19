import express from "express";
import { loginUser } from "../controllers/auth";
import { check } from "express-validator";

const router = express.Router()

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 })
], loginUser)

export default router