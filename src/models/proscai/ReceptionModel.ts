import { connection } from "../../config/mysql"
import { getPagination } from "../../helpers/pagination"
import fs from 'node:fs'

interface Options {
  page?: string
  size?: string
  search?: string
}


export class ReceptionModel {

  static getList = async (options: Options) => {

    const { page = '1', size = '10', search = '' } = options

    const { limit, offset } = getPagination(page, size)

    const files = fs.readdirSync('./src/uploads/RECEPCIONES')

    const like = search ? `AND dnum LIKE '${search}%' OR dreferellos LIKE '%${search}%'` : '';

    const query = `
    SELECT 
    dfecha,
    dnum,
    ditipmv,
    drefer,
    dreferellos,
    CONCAT(PRVCOD,PRVNOM) AS proveedor,
    dcantf,
    dcfdiuuid 
    FROM FDOC
    LEFT JOIN FPRV ON FPRV.PRVSEQ=FDOC.PRVSEQ
    WHERE DMULTICIA='01' AND DESFACT=2 AND DSTATUSCFD=-3 ${like}
    LIMIT ${limit}
    `

    const con = await connection()

    const [results] = await con.query(query) as Array<any>

    const res = results.map(reception =>
    ({
      ...reception,
      hasFile: files.some(file => file === `${reception.dnum}.pdf`)
    })
    )

    return res

  }


}