
import { connection } from "../../config/mysql"
import { getPagination } from "../../helpers/pagination";

export class ShipmentsModel {

  static shipments = async ({ page, size, search }: { page: string, size: string, search: string }) => {

    const { limit, offset } = getPagination(page, size);

    const like = search ? 'AND DRUTA  LIKE :search' : '';



    const consulta = `
    SELECT 
    DNUM factura,
    DTALON remision,
    CAST(mid(DRUTA,1,POSITION("." IN DRUTA)-1) AS CHAR)  ruta,
    DRUTA druta,
    DFECHA fecha,
    CLICOD codigoCliente,
    CLINOM nombreCliente,
    AGDESCR agente,
    SUM(DCOSTOFLETE) AS costo ,
    DFOLIO estado,
    DATE_FORMAT(DFECHAFOLIO,"%Y-%m-%d") fechaFolio,
    DREFERELLOS referencia
    FROM FDOC
    LEFT JOIN FCLI ON FCLI.CLISEQ=FDOC.CLISEQ
    LEFT JOIN FAG AS AG1 ON AG1.AGTNUM=FDOC.DPAR1
    WHERE DESFACT=1 AND mid(DNUM,1,1)='F' AND DMULTICIA='01' AND DFECHA>='2022-01-01' 
    
    GROUP BY RUTA
    ${like}
    ORDER BY DFECHA DESC ,DRUTA,DNUM
    limit ${offset}, ${limit}
    `


    const [shipments] = await (await connection()).query(consulta) as Array<Record<any, any>>



    return shipments


  }
}
