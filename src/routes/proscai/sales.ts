import { Router } from "express";
import { SalesController } from "../../controllers/proscai/SalesController";


export const proscaiSalesRouter = Router()

proscaiSalesRouter.get('/sales', SalesController.getSales);
proscaiSalesRouter.get('/sales/remissions', SalesController.getRemissions);
proscaiSalesRouter.get('/sales/remissions/:id', SalesController.getRemission);
proscaiSalesRouter.get('/sales/cp', SalesController.getSalesByPostalCode)