import { ObjectId } from "mongoose"
import { Category } from "./category"


export interface Subcategory {
  id: string
  name: string
  category: Category

}


export interface SubcategoryId extends Subcategory {
  id: string
  _id: ObjectId
}