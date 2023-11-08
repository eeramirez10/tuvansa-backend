import { Router } from 'express'
import { AuthController } from '../controllers/Auth'

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)