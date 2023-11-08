import mongoose from 'mongoose'
import 'dotenv/config'

const {
  MONGO_DB_URI,
  MONGO_DB_URI_TEST,
  NODE_ENV
} = process.env

console.log( NODE_ENV)

const connectionString = NODE_ENV === 'production' ? MONGO_DB_URI! : MONGO_DB_URI_TEST!

export const conectDB = async (): Promise<void> => {
  try {
    mongoose.connect(connectionString)
  } catch (error) {
    console.log(error)
  }
}
