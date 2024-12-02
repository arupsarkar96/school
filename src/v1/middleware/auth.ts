import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import configuration from '../../config';

export const adminAuthorize = (req: Request, res: Response, next: NextFunction) => {
    // Check for the token in the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    // Verify the token
    jwt.verify(token, configuration.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'Access Denied: Invalid token' });
        }

        // Ensure data is an object and contains the required role
        if (data && typeof data === 'object') {
            req.headers["x-id"] = data.id;      // user data from the token payload
            req.headers["x-role"] = data.role;  // user data from the token payload
            req.headers["x-school"] = data.school; // user data from the token payload

            // Check if the user role is 'admin'
            if (data.role !== 'admin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient permissions' });
            }
        }
        next(); // Proceed to the next middleware or route handler
    });
};

export const teacherAuthorize = (req: Request, res: Response, next: NextFunction) => {
    // Check for the token in the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    // Verify the token
    jwt.verify(token, configuration.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'Access Denied: Invalid token' });
        }

        // Ensure data is an object and contains the required role
        if (data && typeof data === 'object') {
            req.headers["x-id"] = data.id;      // user data from the token payload
            req.headers["x-role"] = data.role;  // user data from the token payload
            req.headers["x-school"] = data.school; // user data from the token payload

            // Check if the user role is 'admin'
            if (data.role !== 'admin' && data.role !== 'teacher') {
                return res.status(403).json({ message: 'Access Denied: Insufficient permissions' });
            }
        }
        next() // Proceed to the next middleware or route handler
    });
};