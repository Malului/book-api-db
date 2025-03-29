import prisma from "../prisma.js"

export const getAllUsers = async (req, res, next) => {
    //Get all users - findmany
    //if not, throw error
    //if true, res

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        if (!users){
            const error = new Error("Could not fetch users");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: `Total user${users.length !== 1 ? 's' : ''}: ${users.length}`,
            data: {
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getOneUser = async (req, res, next) => {
    //get the id from the params
    //find in the user model
    //if exists false, throw error
    //If true, display info

    try {
        const userId = req.params.id;

        const foundUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        })

        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: foundUser
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    
}

export const deleteUser = async (req, res, next) => {
    
}