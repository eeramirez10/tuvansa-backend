import { ObjectId, model } from 'mongoose'
import { userSchema } from '../schemas/user'
import { type IUser } from '../interfaces/user.types'

const User = model<IUser>('User', userSchema)



export class UserModel {
  static create = async ({ input }: { input: IUser }) => {
    const user = await User.create(input)
    return user
  }

  static findById = async (id: String) => {
    const user = await User.findById(id)
    return user
  }

  static findOne = async ({input}: { input: object}) => {

    const user = await User.findOne({ ...input })
    return user
  }
}
