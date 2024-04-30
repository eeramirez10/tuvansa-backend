import { model } from 'mongoose';
import { type Category } from '../interfaces/category';
import { categorySchema } from '../schemas/category';
import { Subcategory } from '../interfaces/subcategory.interface';

const Category = model<Category>('Category', categorySchema)

export class CategoryModel {

  static getAll = async () => {

    const categories = await Category.find({}).populate('subcategories')

    return categories

  }

  static findOne = async ({ name }: { name: string }): Promise<Category> => {

    const category = (await Category.findOne({ name }))

    return category

  }

  static findById = async ({ id }: { id: string }) => {
    const category = await Category.findById(id).populate('subcategories')

    return category
  }

  static create = async ({ name, subcategories }: { name: string, subcategories: Subcategory[] }) => {
    const category = await Category.create({ name: name.trim().toUpperCase(), subcategories })

    return category
  }

  static update = async ({ id, name }: { id: string, name: string }) => {
    return (await Category.findByIdAndUpdate(id, {  name: name.trim().toUpperCase() })).populate('subcategories')
  }

}