import { connection } from "../../config/mysql";


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