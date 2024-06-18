import mysql from 'mysql2/promise';
const connection = async () => await mysql.createConnection({
  host: 'tuvansa.dyndns.org',
  user: 'consultas',
  password: 'consultas',
  database: 'tuvansa'
})

export class SupplierModel {
  static getByName = async ({ search }: { search: string | undefined | null }) => {

    const like = search ? `AND (PRVNOM LIKE '%${search.toUpperCase()}%')` : ' ';

    const con = await connection()

    const query = `
    SELECT 
      PRVCOD uid, 
      PRVNOM name
      FROM FPRV
      WHERE PRVCOD NOT LIKE 'D%'
    ${like}
    ORDER BY PRVNOM
    LIMIT 5

    `



    const [suppliers] = await con.query(query);



    return suppliers
  }
}