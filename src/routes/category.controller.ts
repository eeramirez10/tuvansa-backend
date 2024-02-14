import { Router } from 'express'
import { validateJWT } from '../middlewares/validateJTW'
import { CategoryController } from '../controllers/CategoryController'

export const categoryRouter = Router()

categoryRouter.get('/',validateJWT, CategoryController.getAll )
