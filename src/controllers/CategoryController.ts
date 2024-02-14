import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../models/CategoryModel";



export class CategoryController {

  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const categories = await CategoryModel.getAll()

      res.json({ categories })

    } catch (error) {
      console.log(error)

      res.status(500).json({
        error: "ocurrion un error"
      })
    }
  }
}