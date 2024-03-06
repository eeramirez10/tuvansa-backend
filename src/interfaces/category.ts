import { ObjectId } from "mongoose"
import { Subcategory } from "./subcategory.interface"

export interface Category {
  name: string,
  subcategories: Subcategory[]
}
