import { model } from 'mongoose'
import { userSchema } from '../schemas/user'
import { UpdateUser, type IUser } from '../interfaces/user.types';

const User = model<IUser>('User', userSchema)



export class UserModel {
  static create = async ({ input }: { input: IUser }) => {
    const user = await User.create(input)
    return user
  }

  static update = async ({ id, input }: { id: string, input: UpdateUser }) => {
    console.log(input.name)
    console.log(id)
    const updatedUser = await User.findByIdAndUpdate(id, { ...input })
    return updatedUser
  }

  static findById = async (id: String) => {
    const user = await User.findById(id)
    return user
  }

  static findOne = async ({ input }: { input: object }) => {

    const user = await User.findOne({ ...input })
    return user
  }

  static getList = async () => {
    return await User.find({})
  }
}
