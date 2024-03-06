import { model } from "mongoose"
import { subcategorySchema } from "../schemas/subcategory"
import { Subcategory, SubcategoryId } from "../interfaces/subcategory.interface"



const Subcategory = model<Subcategory>('Subcategory', subcategorySchema)

export class SubcategoryModel {
  static create = async ({ name, category }: { name: string, category?: string }) => {
    const subcategory = await Subcategory.create({ name, category })

    return subcategory
  }

  static doc = async ({ name, category }: { name: string, category?: string }) => {

    return new Subcategory({ name, category })
  }

  static update = async ({id,  category }: { id: string,  category?: string }) => {

    return await Subcategory.findByIdAndUpdate(id, { category })
  }

}