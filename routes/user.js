import { Router } from 'express'
import { UserController } from '../controllers/User.js'

export const userRouter = Router()

userRouter.post('/', UserController.create)
