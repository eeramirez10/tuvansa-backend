import mysql from 'mysql2/promise'


const connection = async () =>  await mysql.createConnection({
  host: 'tuvansa.dyndns.org',
  user: 'consultas',
  password: 'consultas',
  database: 'tuvansa'
})


export class CustomerModel {
  static getAll = async ({ search }: { search: string | undefined | null }) => {

    
    const like = search ? `WHERE (CLINOM LIKE '%${search.toUpperCase()}%')` : ' ';
    console.log(like)
    const con = await connection()

    const [customers] = await con.query(`
      SELECT CLICOD as uid,CLINOM as name,AGTNUM,AGDESCR FROM FCLI
      LEFT JOIN FAG AS AG1 ON AG1.AGTNUM=FCLI.CLIPAR1
      ${like}
      order by CLINOM
      LIMIT 5
    `)

    return customers
  }
}