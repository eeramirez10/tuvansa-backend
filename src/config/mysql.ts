import mysql from 'mysql2/promise'


export const connection = async () =>  await mysql.createConnection({
  host: 'tuvansa.dyndns.org',
  user: 'consultas',
  password: 'consultas',
  database: 'tuvansa'
})

connection()
 
