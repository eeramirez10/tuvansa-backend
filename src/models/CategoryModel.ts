import { model } from 'mongoose';
import { type Category } from '../interfaces/category';
import { categorySchema } from '../schemas/category';

const Category = model<Category>('Category', categorySchema)

export class CategoryModel{

  static getAll = async () => {

    const categories = await Category.find({})

    return categories

  }

}