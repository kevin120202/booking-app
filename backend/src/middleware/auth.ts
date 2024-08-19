import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"]
    if (!token) {
        return res.status(401).json({ message: "unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" })
    }
}

/*************************
- This middleware is used to protect routes by ensuring that only requests with a valid JWT can access certain resources
- The 'Request' interface is extended to include a 'userId' property, making it easier to work with user information throughout the app
*************************/
