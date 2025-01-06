import { connection } from '../../config/mysql';
import { BRANCH_OFFICE_VALUES } from '../../helpers/branchOffice';
import { getPagination } from '../../helpers/pagination';

interface GetListProps {
  page?: string
  size?: string
  search?: string
  almacen?: string
  family?: string
  withStock?: boolean
}

export class ProscaiInventoryModel {

  static getList = async (props: GetListProps) => {
    const { page = '1', size = '50', search = '', almacen = '01', withStock = false, family = '' } = props;

    const conexion = await connection();




    const { limit, offset } = getPagination(page, size);

    const like = search
      ? `
      AND (
      IEAN LIKE '${search.trim().toUpperCase()}%' 
      OR ICOD LIKE '${search.trim().toUpperCase()}%' 
      OR I2DESCR LIKE '%${search.trim().toUpperCase()}%'
    ) 
    ` : '';
    const isStock = withStock ? 'AND ALMCANT <> 0' : '';
    const searchFamily = family === 'all' ? '' : family ? `AND FAMB.FAMDESCR = '${family.toUpperCase()}'` : '';

    const [inventarios] = await conexion.query(`
      SELECT  
        ALMNUM branchOffice,
        CAST(FINV.ISEQ AS CHAR) iseq,
        FAMB.FAMDESCR as familyDescription,
        ICOD as cod,
        IEAN as ean,
        IUM as um,
        I2DESCR as description,
        ALMCANT as quantity,
        ILISTA4 costo 
      FROM
        FALM
        LEFT JOIN FINV ON FINV.ISEQ = FALM.ISEQ
        LEFT JOIN FINV2 ON FINV2.I2KEY = FALM.ISEQ
        LEFT JOIN FFAM AS FAMB ON FAMB.FAMTNUM = FINV.IFAMB
      WHERE ALMNUM = '${almacen}'
        and ITIPO=1 
        ${isStock}
        AND mid(ICOD, 1, 2) = '${almacen}' 
        ${searchFamily}
        ${like}
      GROUP BY ICOD
      ORDER BY ICOD
      limit ${limit}
    `) as Array<any>;


    // const ubications = async (cod) => {
    //   const [ubications] = await conexion.query(`
    //     SELECT  ALMNUM warehouse, CAST(FALM.almseq AS CHAR)  almseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
    //     LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
    //     LEFT JOIN FINV2 ON FINV2.I2KEY=FALM.ISEQ
    //     WHERE ICOD = '${cod}' and ITIPO=1  and IEAN <> '' and ALMNUM <> ${almacen}
    //     GROUP BY ALMNUM,IEAN
    //   `) as Array<any>;

    //   return ubications.map(inv => ({ ...inv, warehouse: { code: inv.warehouse, name: "" } }));
    // };

    const result = {
      items: await Promise.all(
        inventarios.map(async (inv) => ({
          ...inv, branchOffice: {
            code: inv.branchOffice,
            name: BRANCH_OFFICE_VALUES[inv.branchOffice],
          },
          // shelters: await ubications(inv.cod)
          shelters: []

        }))
      ),
      total: 0
    };

    // Close the connection after all queries are done
    conexion.end();

    return result;
  }

  static getByIseq = async ({ iseq }: { iseq: string }) => {
    const conexion = await connection();

    const [[inventory]]: any = await conexion.query(`
      SELECT  ALMNUM branchOffice, CAST(FINV.ISEQ AS CHAR) iseq,ICOD cod,IEAN ean,I2DESCR description, ALMCANT AS quantity, ILISTA4 costo FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE ITIPO=1  and IEAN <> '' AND FINV.ISEQ = ${iseq} AND ALMNUM = '01'
      GROUP BY ALMNUM,IEAN
      ORDER BY ALMNUM,IEAN
    `);

    // Close the connection after the query
    conexion.end();

    return {
      ...inventory,
      branchOffice: {
        code: inventory.branchOffice,
        name: BRANCH_OFFICE_VALUES[inventory.branchOffice]
      }
    };
  }

  static getShelter = async ({ almseq }: { almseq: string }) => {
    const conexion = await connection();

    const [inventarios] = await conexion.query(`
      SELECT  ALMNUM branchOffice, CAST(FINV.ISEQ AS CHAR) iseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE FALM.almseq = ${almseq} and ITIPO=1 
      GROUP BY IEAN
      ORDER BY ICOD
    `) as Array<any>;

    const [[shelter]] = await conexion.query(`
      SELECT  ALMNUM almacen, CAST(FALM.almseq AS CHAR)  almseq,ICOD cod,IEAN ean,I2DESCR description, SUM(ALMCANT) AS quantity FROM FINV
      LEFT JOIN FALM ON FALM.ISEQ=FINV.ISEQ
      LEFT JOIN FINV2 ON FINV2.I2KEY=FINV.ISEQ
      WHERE FALM.almseq = '${almseq}' and ITIPO=1  and IEAN <> ''
      GROUP BY ALMNUM,IEAN
    `) as Array<any>;

    // Close the connection after the query
    conexion.end();

    return {
      ...shelter,
      warehouse: {
        code: shelter.almacen,
        name: ""
      }
    };
  }

}
