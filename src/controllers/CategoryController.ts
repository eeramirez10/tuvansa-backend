import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../models/CategoryModel";
import { type Category } from "../interfaces/category";
import { SubcategoryModel } from '../models/SubcategoryModel';



interface RequestExt extends Request {
  body: Category
}

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
  static create = async (req: RequestExt, res: Response, next: NextFunction) => {

    const category = req.body



    try {

      const isCategory = await CategoryModel.findOne({ name: category.name })

      if (isCategory) {
        return res.status(409).json({
          ok: false,
          msg: "Category exist in DB"
        })
      }


      const subcategoryDB = await Promise.all(
        category.subcategories.map(async (sub) => {

          const subcategory = await SubcategoryModel.create({ name: sub.name })

          return subcategory.id
        })
      )

   


      const categoryDB = await CategoryModel.create({ name: category.name, subcategories: subcategoryDB })

      subcategoryDB.forEach((sub) => {

        SubcategoryModel.update({ id: sub, category: categoryDB.id })
      })

      res.json({
        ok: true,
        category: categoryDB
      })

    } catch (error) {
      next(error)
    }

  }


}