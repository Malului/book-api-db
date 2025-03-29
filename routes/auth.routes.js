import { Router  } from "express";
import authorize from "../middleware/auth.middleware.js";

import { register, login, logout, viewProfile, updateProfile } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', register)

authRouter.post('/login', login)

authRouter.post('/logout', authorize, logout)

authRouter.get('/profile', viewProfile)

authRouter.put('/profile', updateProfile)


export default authRouter;