import prisma from "../prisma.js"

export const getAllUsers = async (req, res, next) => {
    //Get all users - findmany
    //if not, throw error
    //if true, res

    try {
        const users = await prisma.user.findMany();

        if (!users){
            const error = new Error("Could not fetch users");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
}

export const getOneUser = async (req, res, next) => {
    
}

export const updateUser = async (req, res, next) => {
    
}

export const deleteUser = async (req, res, next) => {
    
}