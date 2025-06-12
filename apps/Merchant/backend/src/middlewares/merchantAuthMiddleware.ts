import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AuthService from "../config/jwtConfig";

interface CustomeRequest extends Request {
    id?: string
}

export const merchantAuthMiddleware = (req: CustomeRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "No token provided"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const verifiedToken = jwt.verify(token, AuthService.jwtMerchantSecret) as { id: string };
        req.id = verifiedToken.id;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token"
        });
    }
};

