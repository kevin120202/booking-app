import express from "express";
import { Request, Response } from "express"
import { loginUser } from "../controllers/auth";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router()

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 })
], loginUser)

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    return res.status(200).send({ userId: req.userId })
})

export default router