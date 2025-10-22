import express, { Request, Router } from 'express';
import { SalesProscaiModel } from '../models/proscai/SalesModel';
import { Remission } from '../interfaces/remission';
import { validateJWT } from '../middlewares/validateJTW';
import { RemissionModel } from '../models/Remission';
import { ObjectId } from 'mongoose';
import { SalesController } from '../controllers/SalesController';

interface ReqExt extends Request {
  userId: ObjectId
}


export const salesRouter = Router()

salesRouter.post('/remissions/:id', validateJWT, SalesController.create)

salesRouter.get('/remissions/:id', validateJWT, SalesController.getById)

salesRouter.get('/remissions', validateJWT, SalesController.getAll)

salesRouter.put('/remissions/:id', validateJWT, SalesController.update)
