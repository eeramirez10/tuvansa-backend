import { connection } from "../../config/mysql";

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