import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
    required: true
  },
  rol: {
    type: String,
    required: true
  }

}, {
  timestamps: true
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
