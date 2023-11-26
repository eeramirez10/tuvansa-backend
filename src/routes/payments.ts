import { Router } from 'express'
import { PaymentController } from '../controllers/Payment'

export const paymentsRouter = Router()

paymentsRouter.get('/', PaymentController.getAll)
paymentsRouter.get('/:paymentId', PaymentController.getById)
paymentsRouter.post('/', PaymentController.create)
paymentsRouter.put('/:id', PaymentController.update)
