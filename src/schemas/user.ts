import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { IUser } from '../interfaces/user.types'

export const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  branchOffice: {
    type: String,
    required: true,
    enum: ["Mexico", "Monterrey", "Veracruz", "Mexicali", "Queretaro", "Cancun"]
  },
  rol: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  pagePermission: [{ type: String }],
  documentsAuthorization:[{ type: String, enum:['purchaseOrder']}]

}, {
  timestamps: true,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(mongooseUniqueValidator)
