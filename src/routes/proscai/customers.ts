import { Router } from "express";
import { CustomerController } from "../../controllers/proscai/Customer";

export const proscaiRouter = Router()

proscaiRouter.get('/customers', CustomerController.getAll)
