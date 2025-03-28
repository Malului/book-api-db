import { Router  } from "express";

import { getAllUsers, getOneUser, updateUser, deleteUser } from "../controller/user.contoller.js";

const userRouter = Router();


userRouter.get('/', getAllUsers)

userRouter.get('/:id', getOneUser)

userRouter.put('/:id', updateUser)

userRouter.delete('/:id', deleteUser)


export default userRouter;