import { Router  } from "express";

import { register, login, logout, viewProfile, updateProfile } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', register)

authRouter.post('/login', login)

authRouter.post('/logout', logout)

authRouter.get('/profile', viewProfile)

authRouter.put('/profile', updateProfile)


export default authRouter;