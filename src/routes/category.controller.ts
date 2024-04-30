import { Router } from 'express'
import { validateJWT } from '../middlewares/validateJTW'
import { CategoryController } from '../controllers/CategoryController'

export const categoryRouter = Router()

categoryRouter.get('/', validateJWT, CategoryController.getAll)
categoryRouter.get('/:id', validateJWT, CategoryController.getById)
categoryRouter.post('/', validateJWT, CategoryController.create)
categoryRouter.put('/:id', validateJWT, CategoryController.edit)