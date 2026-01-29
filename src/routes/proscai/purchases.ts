import { Router } from "express";
import { PurchasesController } from "../../controllers/proscai/PurchasesController";



export const purchasesRouter = Router()

purchasesRouter.get('/purchases/orders', PurchasesController.getPurchases)