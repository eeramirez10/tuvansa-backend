import mongoose from 'mongoose'
import 'dotenv/config'
import { envs } from './envs'

const {
  MONGO_DB_URI,
  MONGO_DB_URI_TEST,
  MONGO_DB_URI_DEV,
  NODE_ENV
} = envs

console.log( NODE_ENV)

const connectionString = NODE_ENV === 'production' ? MONGO_DB_URI! : NODE_ENV === 'development' ? MONGO_DB_URI_DEV! : MONGO_DB_URI_TEST!

export const conectDB = async () => {
  try {
    mongoose.connect(connectionString)
  } catch (error) {
    console.log(error)
  }
}
