import { model } from "mongoose"
import { subcategorySchema } from "../schemas/subcategory"
import { Subcategory, SubcategoryId } from "../interfaces/subcategory.interface"



const Subcategory = model<Subcategory>('Subcategory', subcategorySchema)

export class SubcategoryModel {
  static create = async ({ name, category }: { name: string, category?: string }) => {
    const subcategory = await Subcategory.create({  name: name.toUpperCase(), category })

    return subcategory
  }

  static doc = async ({ name, category }: { name: string, category?: string }) => {

    return new Subcategory({ name, category })
  }

  static update = async ({id,  category, name }: { id: string,  category?: string, name?: string }) => {

    try {
      return await Subcategory.findByIdAndUpdate(id, { category,  name: name.toUpperCase() })
    } catch (error) {
      console.log(error)
    }

   
  }

}