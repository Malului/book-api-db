import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import "dotenv/config"
import prisma from "../prisma.js";

const authorize = async (req, res, next) => {
    //check if authorization header exists
    //extract token
    //verify token
    //check if user still exists
    //attach user to req object
    //next
    //catch

    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            })
        };

        req.user = user;

        next()


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token Expired"
            })
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Access Denied || Forbidden"
        })
    }
}

export default authorize;