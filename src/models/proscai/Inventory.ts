import { connection } from '../../config/mysql';
import { getPagination } from '../../helpers/pagination';

export class ProscaiInventoryModel {

  static getList = async ({ page = '1', size = '5', search = '' }: { page?: string, size?: string, search?: string }) => {

    const conexion = await connection()

    const { limit, offset } = getPagination(page, size)

    const like = search ? `AND IEAN LIKE '${search}%' OR ICOD LIKE '${search}%'` : '';

    const [inventarios] = await conexion.query(`
      SELECT CAST(FINV.ISEQ AS CHAR) iseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE ALMNUM='01' AND ITIPO=1 AND mid(ICOD,1,2)='01' and IEAN <> ''
      ${like}
      GROUP BY IEAN
      
      limit ${offset}
    
    `)

    // const countInventoriesPromise = conexion.query(`
    // //   SELECT   COUNT(*) total FROM FINV
    // //   LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
    // //   LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
    // //   WHERE ALMNUM='01' AND ITIPO=1 AND mid(ICOD,1,2)='01' and IEAN <> ''
    // // `)


    conexion.destroy()

    return {
      items: inventarios,
      total: 0
    }

  }

  static getByIseq = async ({ iseq }: { iseq: string }) => {
    const conexion = await connection()

    const [[inventory]]: any = await conexion.query(`
      SELECT CAST(FINV.ISEQ AS CHAR) iseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE ALMNUM='01' AND ITIPO=1 AND mid(ICOD,1,2)='01' and IEAN <> '' AND FINV.ISEQ = ${iseq}
      GROUP BY IEAN
      ORDER BY IEAN
    `)

    return inventory

  }

}