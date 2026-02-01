import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "@repo/backend-common";

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    req.user = decoded;
    next();
}