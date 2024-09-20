import mysql from 'mysql2/promise'
import { envs } from './envs'


export const connection = async () =>  await mysql.createConnection({
  host: envs.MYSQL_HOST,
  user: envs.MYSQL_USER,
  password: envs.MYSQL_PASSWORD,
  database: envs.MYSQL_DATABASE
})


 
