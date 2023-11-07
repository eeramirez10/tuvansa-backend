import { model } from 'mongoose'
import { userSchema } from '../schemas/user.js'

const User = model('User', userSchema)

export class UserModel {
  static create = async ({ input }) => {
    const user = await User.create(input)
    return user
  }
}
