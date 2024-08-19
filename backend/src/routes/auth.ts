import express from "express";
import { loginUser, validateToken } from "../controllers/auth";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router()

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 })
], loginUser)

router.get("/validate-token", verifyToken, validateToken)

export default router