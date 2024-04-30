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

      next(error)

      res.status(500).json({
        error: "ocurrion un error"
      })
    }
  }

  static create = async (req: RequestExt, res: Response, next: NextFunction) => {

    const category = req.body


    try {

      let subcategoryDB

      const isCategory = await CategoryModel.findOne({ name: category.name })


      if (isCategory) {
        return res.status(409).json({
          ok: false,
          msg: "Category exist in DB"
        })
      }

      if (category.subcategories !== undefined) {
        subcategoryDB = await Promise.all(
          category.subcategories.map(async (sub) => {

            const subcategory = await SubcategoryModel.create({ name: sub.name })

            return subcategory.id
          })
        )
      }



      const categoryDB = await CategoryModel.create({ name: category.name, subcategories: subcategoryDB === undefined || subcategoryDB === '' ? [] : subcategoryDB })

      if (category.subcategories !== undefined) {

        subcategoryDB.forEach((sub) => {

          SubcategoryModel.update({ id: sub, category: categoryDB.id })
        })

      }


      res.json({
        ok: true,
        category: categoryDB
      })

    } catch (error) {
      next(error)
    }

  }

  static edit = async (req: RequestExt, res: Response, next: NextFunction) => {
    const id = req.params.id as string
    const category = req.body


    try {

      const categoryDB = await CategoryModel.update({ id, name: category.name })



      // cuando no tiene categorias 
      if (categoryDB.subcategories.length === 0) {
        const subcategories = await Promise.all(
          category.subcategories.map(async (sub) => {
            const subcategory = await SubcategoryModel.create({ name: sub.name, category: id })
            return subcategory.id
          })
        )

        categoryDB.subcategories = subcategories

        await categoryDB.save()


      } else {

        const newsCategories = category.subcategories.filter(sub => !categoryDB.subcategories.some(subDB => subDB?.id === sub?.id))


        if (newsCategories.length > 0) {

          const subcategories = await Promise.all(
            newsCategories.map(async (sub) => {
              const subcategory = await SubcategoryModel.create({ name: sub.name, category: id })
              return subcategory.id
            })
          )

          const categoriesArr = [
            ...categoryDB.subcategories.map(sub => sub.id),
            ...subcategories
          ]


          categoryDB.subcategories = categoriesArr

          await categoryDB.save()

        }

        await Promise.all(
          category.subcategories.map(async (subcategory) => {
            await SubcategoryModel.update({ id: subcategory.id, name: subcategory.name })
          })
        )

      }



      res.json({
        ok: true,
        category: await CategoryModel.findById({ id })
      })

    } catch (error) {
      next(error)
    }

  }

  static getById = async (req: RequestExt, res: Response, next: NextFunction) => {

    const id = req.params.id as string

    try {

      const category = await CategoryModel.findById({ id })

      res.json({ category })

    } catch (error) {
      next(error)
    }
  }


}