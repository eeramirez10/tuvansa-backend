import { Router } from 'express'
import { AuthController } from '../controllers/Auth'
import { validateJWT } from '../middlewares/validateJTW'

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)
authRouter.post('/renew',validateJWT, AuthController.revalidarToken)