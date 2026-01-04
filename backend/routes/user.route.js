import express from 'express'
import { Router } from 'express'

 import { isTokenCoreect, logInAdmin, logInUser, registerSeller, registerUser } from'../controller/user.controller.js';



const userRouter = Router();


userRouter.post('/register',registerUser)

userRouter.post('/registerSeller',registerSeller)

// convert seller account?

userRouter.post('/logIn',logInUser)

userRouter.post('/admin',logInAdmin)

userRouter.post('/token',isTokenCoreect)

export default userRouter;