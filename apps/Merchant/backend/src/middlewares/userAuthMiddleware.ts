import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AuthService from "../config/jwtConfig";

interface CustomRequest extends Request {
    id?: string
}

export const userAuthMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "No token provided"
            
        });
        return;
    }

    res.json({
        authHeader
    })

    const token = authHeader.split(" ")[1];

    try {
        const verifiedToken = jwt.verify(token, AuthService.jwtUserSecret) as { id: string };
        req.id = verifiedToken.id;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token"
        });
    }
};

