import { Router } from 'express'
import { PaymentController } from '../controllers/Payment'

export const paymentsRouter = Router()

paymentsRouter.get('/', PaymentController.getAll)
paymentsRouter.post('/', PaymentController.create)
