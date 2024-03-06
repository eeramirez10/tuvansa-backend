import { ObjectId } from "mongoose"
import { Category } from "./category"


export interface Subcategory {

  name: string
  category: Category

}


export interface SubcategoryId extends Subcategory {
  id: string
  _id: ObjectId
}