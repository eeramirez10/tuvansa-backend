import { Router } from 'express'
import { validateJWT } from '../middlewares/validateJTW'
import { CountController } from '../controllers/Count.controller'

export const countsRouter = Router()

countsRouter.delete('/:id',validateJWT, CountController.delete)
