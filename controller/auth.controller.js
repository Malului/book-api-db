import prisma from "../prisma.js"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import "dotenv/config"

export const register = async (req, res, next) => {
    //start a session && transaction
    //get details
    //check if email exists
    //if true, return
    //if not, hash password
    //create user
    //generate token
    //commit transaction && end session
    //catch - return res && abort transaction && end session

    try {
        let { email, password, name } = req.body;

        const result = await prisma.$transaction( async (tx) => {
            
            const existingEmail = await tx.user.findUnique({
                where: { email }
            })

            if (existingEmail) {
                const error = new Error("Email already exists");
                error.statusCode = 406;
                throw error;
            }

            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            //Create a new user
            const newUser = await tx.user.create({
                data: {
                    email,
                    password: hashPassword,
                    name
                },
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            })

            //Generate token
            const token = jwt.sign({
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            return { newUser, token}
        })

        return  res.status(201).json({
                success: true,
                data: result
            })
    } catch (error) {

        if(error.statusCode === 406) {
            return res.status(406).json({
                success: false,
                message: error.message
            })
        }

        console.error(error);

        return res.send(400).json({
            success: false,
            message: "New user not created",
            error: error.message
        })
    }
}

export const login = async (req, res, next) => {
    //Get email && password
    //check if email exists
    //if not, throw error
    //if true, compare password
    //if not, error && return
    //if true, generate token

    try {
        const { email, password } = req.body;

        const result = await prisma.$transaction( async (tx) => {

            const existingUser = await tx.user.findUnique({
                where: { email }
            })

            if (!existingUser) {
                const error = new Error("User does not exist");
                error.statusCode = 404;
                throw error;
            }

            const comparedPassword = await bcrypt.compare(password, existingUser.password);

            if (!comparedPassword){
                const error = new Error("Password is incorrect");
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign({
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            })

            const { password: _, ...userWithoutPassword } = existingUser;
            return { user: userWithoutPassword, token}
        })

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        if (error.statusCode === 401) {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Could not login the user"
        })
    }

    
}

export const logout = async (req, res, next) => {
    //clear cookie token in cache

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Error logging out",
            error: error.message
        })
    }
}

export const viewProfile = async (req, res, next) => {
    
}

export const updateProfile = async (req, res, next) => {
    
}