import { connection } from '../../config/mysql';
import { BRANCH_OFFICE_VALUES } from '../../helpers/branchOffice';
import { getPagination } from '../../helpers/pagination';

interface GetListProps {
  page?: string
  size?: string
  search?: string
  almacen?: string
}

export class ProscaiInventoryModel {

  static getList = async (props: GetListProps) => {

    const { page = '1', size = '10', search = '', almacen = '01' } = props

    const conexion = await connection()

    const { limit, offset } = getPagination(page, size)

    const like = search ? `AND IEAN LIKE '${search}%' OR ICOD LIKE '${search}%'` : '';

    const [inventarios] = await conexion.query(`
      SELECT  ALMNUM branchOffice, CAST(FINV.ISEQ AS CHAR) iseq,ICOD cod,IEAN ean,I2DESCR description, ALMCANT quantity, ILISTA4 costo FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE ALMNUM = ${almacen} and ITIPO=1 
      ${like}
      GROUP BY IEAN
      ORDER BY ICOD
      
      limit  ${offset}
    
    `) as Array<any>


    const ubications = async (cod) => {
      const [ubications] = await conexion.query(`
        SELECT  ALMNUM warehouse, CAST(FALM.almseq AS CHAR)  almseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
        LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
        LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
        WHERE ICOD = '${cod}' and ITIPO=1  and IEAN <> '' and ALMNUM <> ${almacen}
        GROUP BY ALMNUM,IEAN
      
      `) as Array<any>

      return ubications.map(inv => ({ ...inv, warehouse: { code: inv.warehouse, name: "" } }))
    }

    // const countInventoriesPromise = conexion.query(`
    // //   SELECT   COUNT(*) total FROM FINV
    // //   LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
    // //   LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
    // //   WHERE ALMNUM='01' AND ITIPO=1 AND mid(ICOD,1,2)='01' and IEAN <> ''
    // // `)




    return {
      items: await Promise.all(
        inventarios.map(async (inv) => ({
          ...inv, branchOffice: {
            code: inv.branchOffice,
            name: BRANCH_OFFICE_VALUES[inv.branchOffice],

          },
          shelters: await ubications(inv.cod)
        }))
      ),
      total: 0
    }

  }

  static getByIseq = async ({ iseq }: { iseq: string }) => {
    const conexion = await connection()

    const [[inventory]]: any = await conexion.query(`
      SELECT  ALMNUM branchOffice, CAST(FINV.ISEQ AS CHAR) iseq,ICOD cod,IEAN ean,I2DESCR description, ALMCANT AS quantity, ILISTA4 costo FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE ITIPO=1  and IEAN <> '' AND FINV.ISEQ = ${iseq}
      GROUP BY IEAN
      ORDER BY IEAN
    `)

    return {
      ...inventory,
      branchOffice: {
        code: inventory.branchOffice,
        name: BRANCH_OFFICE_VALUES[inventory.branchOffice]
      }

    }

  }

  static getShelter = async ({ almseq }: { almseq: string }) => {
    const conexion = await connection()

    const [inventarios] = await conexion.query(`
    SELECT  ALMNUM branchOffice, CAST(FINV.ISEQ AS CHAR) iseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
    LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
    LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
    WHERE FALM.almseq = ${almseq} and ITIPO=1 

    GROUP BY IEAN
    ORDER BY ICOD
  
  
  `) as Array<any>

    const [[shelter]] = await conexion.query(`
      SELECT  ALMNUM almacen, CAST(FALM.almseq AS CHAR)  almseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE FALM.almseq = '${almseq}' and ITIPO=1  and IEAN <> ''
      GROUP BY ALMNUM,IEAN
    
    `) as Array<any>

    return {
      ...shelter,
      warehouse: {
        code: shelter.almacen,
        name: ""
      }

    }

  }

}