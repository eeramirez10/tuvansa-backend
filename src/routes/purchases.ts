import { Request, Router } from 'express';
import { PurchaseDto } from '../dtos/purchase.dto';
import { PurchaseModel } from '../models/Purchase';
import { validateJWT } from '../middlewares/validateJTW';
import { ObjectId } from 'mongoose';

export const purchasesRouter = Router()

interface ReqExt extends Request {
  userId: ObjectId
}

purchasesRouter.get('/orders', async (req, res, next) => {

  try {


    const orders = await PurchaseModel.getAllOrders()

    res.json({ results: orders })

  } catch (error) {
    next(error)
  }


})


purchasesRouter.post('/orders', validateJWT, async (req: ReqExt, res, next) => {

  const body = req.body as PurchaseDto

  const user = req.userId as ObjectId

  const [error, orderDto] = PurchaseDto.createOrder({ ...body, user })

  if (error) {
    return res.status(400).json({ error })
  }

  try {

    const order = await PurchaseModel.createOrder(orderDto)

    res.json({ result: order })

  } catch (error) {
    next(error)
  }

})

purchasesRouter.put('/orders/:id', validateJWT, async (req: ReqExt, res, next) => {

  let body = req.body
  const id = req.params.id as string

  const user = req.userId as ObjectId

  try {

    const isRemission = await PurchaseModel.getOrderById(id)

    if (!isRemission) return res.status(400).json({ msg: 'Order not exist' })

    if (body.authorized) {

      body = {
        ...body,
        authorizedBy: user
      }
    }


    const order = await PurchaseModel.updateOrder(id, body)

    res.json({ result: order })

  } catch (error) {
    next(error)
  }

})