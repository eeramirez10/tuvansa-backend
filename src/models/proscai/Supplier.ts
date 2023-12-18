import mysql from 'mysql2/promise';
const connection = async () => await mysql.createConnection({
  host: 'tuvansa.dyndns.org',
  user: 'consultas',
  password: 'consultas',
  database: 'tuvansa'
})

export class SupplierModel {
  static getByName = async ({ search }: { search: string | undefined | null }) => {

    const like = search ? `WHERE (PRVNOM LIKE '%${search.toUpperCase()}%')` : ' ';
    // console.log(like)
    const con = await connection()

    const query = `
    SELECT 
      PRVCOD uid, 
      CONCAT(PRVCOD, " ",PRVNOM) name
      FROM FPRV
    ${like}
    ORDER BY PRVNOM
    LIMIT 5

    `

    const [suppliers] = await con.query(query);

    console.log(suppliers)


    return suppliers
  }
}