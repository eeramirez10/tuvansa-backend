import { RowDataPacket } from "mysql2"
import { connection } from "../../config/mysql"
import { getCurrentMonth, getCurrentYear, getLastDayOfMonth } from "../../helpers/date"


export interface PurchaseOrder extends RowDataPacket {
  ID: string
  PROVEEDOR: string
  OC: string
  PED_PRV: string
  DESDE: string
  VENCE: string
  ALMACEN: string
  FEC_CAPTURA: string
  PZAS: string
  IMPORTE: string
  MONEDA: string
  TC: string
  USUARIO: string
  COMENTARIO: string

}




interface Options {
  from?: string
  to?: string
}



export class PurchaseModel {

  static getPurchaseOrders = async (options: Options): Promise<PurchaseOrder[]> => {

    const lastMonth = parseInt(getCurrentMonth() ) - 1

    const from = options.from ?? `${getCurrentYear()}-${lastMonth}-01`
    const to = options.to ?? `${getCurrentYear()}-${getCurrentMonth()}-${getLastDayOfMonth(getCurrentYear(), getCurrentMonth())}`

    const con = await connection()

    const query = `
      SELECT CASE PEMULTICIA
		WHEN 1 THEN '01 MEXICO'
        WHEN 2 THEN '02 MONTERREY'
        WHEN 3 THEN '03 VERACRUZ'
        WHEN 4 THEN '04 MEXICALI'
        WHEN 5 THEN '05 QUERETARO'
        WHEN 6 THEN '06 CANCUN'
    END AS SUCURSAL, 
     CAST(FPENC.PESEQ as CHAR) as ID,
      CONCAT(PRVCOD,'  ',PRVNOM) AS PROVEEDOR,
      PENUM AS OC,
      PENUMELLOS AS PED_PRV,
      PEDESDE AS DESDE,
      PEVENCE AS VENCE,
      PEALMACEN AS ALMACEN,
      PEDATE2 AS FEC_CAPTURA,
      PEPZAS AS PZAS,
      PECANT AS IMPORTE,
      IF(PEMONEDA=2,'DLS','MXN') AS MONEDA,
      PETIPOC AS TC,
      USRNAME AS USUARIO,
      COML1 AS COMENTARIO
    FROM FPLIN
    LEFT JOIN FPENC ON FPENC.PESEQ=FPLIN.PESEQ
    LEFT JOIN FPRV ON FPRV.PRVSEQ=FPENC.PRVSEQ
    LEFT JOIN FUSERS ON FUSERS.USRSEQ=FPENC.PEUSRALTA
    LEFT JOIN FCOMENT ON FCOMENT.COMSEQFACT=1000000000+FPENC.PESEQ
    WHERE  PEFECHA>=? AND PEFECHA<=?
    AND PESPEDIDO=2 AND PEMULTICIA=1 
    GROUP BY PENUM
    ORDER BY PEDATE2 DESC
    `

    const [orders] = await con.query<PurchaseOrder[]>(query, [from, to])

    return orders



  }



}