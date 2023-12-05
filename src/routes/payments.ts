import { Router } from 'express'
import { PaymentController } from '../controllers/Payment'
import { validateJWT } from '../middlewares/validateJTW'

export const paymentsRouter = Router()

paymentsRouter.use(validateJWT)

paymentsRouter.get('/', PaymentController.getAll)
paymentsRouter.get('/:paymentId', PaymentController.getById)
paymentsRouter.post('/', PaymentController.create)
paymentsRouter.put('/:id', PaymentController.update)
