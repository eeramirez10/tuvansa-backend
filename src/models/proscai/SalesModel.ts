
import { connection } from "../../config/mysql"


import { getCurrentDay, getCurrentMonth, getCurrentYear, getLastDayOfMonth } from "../../helpers/date";

export class SalesModel {

  static getSales = async ({ month, year }: { month?: string, year?: string }) => {

    const mes = !month ? getCurrentMonth() : month
    const anio = !year ? getCurrentYear() : year
    const lastDay = getLastDayOfMonth(anio, mes)

    const con = await connection()
    try {

      const consulta = `
        SELECT AGCIANAME as nombre,  
        AGDESCR as descripcion, 
        AGPAPA AS grupo, 
        AGPRESUP7 AS presupuesto, 
        SUM(AIPRECIO*AICANTF) AS venta_neta, 
        SUM(AIPRECIO*AICANTF)-AGPRESUP7 AS venta_iva, 
        (SUM(AIPRECIO*AICANTF)/AGPRESUP7)*100  AS ejercido,
        SUM((AICANTF*(AIPRECIO-AICOSTO))) AS utilidad, 
        FORMAT((SUM((AICANTF*(AIPRECIO-AICOSTO)))/SUM(AIPRECIO*AICANTF))*100,2) AS porcentaje,
        AGHORAS AS NUM_COT, 
        AGCREDITO AS IMP_COT,
        DATE_FORMAT(DFECHA,'%M') as month,
        DATE_FORMAT(DFECHA,'%Y') as year
        FROM FAXINV
        LEFT JOIN FDOC ON FDOC.DSEQ=FAXINV.DSEQ
        LEFT JOIN FINV ON FINV.ISEQ=FAXINV.ISEQ
        LEFT JOIN FAG ON FAG.AGTNUM=FDOC.DPAR1
        LEFT JOIN FCLI ON FCLI.CLISEQ=FAXINV.CLISEQ
  
        WHERE  
        DFECHA>='${anio}-${mes}-01' AND DFECHA<='${anio}-${mes}-${lastDay}' AND DESFACT=1 AND  DMULTICIA =1 AND DSTATUSCFD = 3  AND ( mid(DNUM,1,2) <> 'AF' AND mid(DNUM,1,2) <> 'AN') AND DFOLIO<>'ANTICIPO'
        AND AGCIANAME IS NOT NULL 
        GROUP BY AGDESCR ORDER BY venta_neta desc
  
      `

      const [sales]: any = await con.query(consulta);

      return sales.map(sale => {

        return {
          ...sale,
          presupuesto: parseFloat(sale.presupuesto),
          venta_neta: parseFloat(sale.venta_neta),
          venta_iva: parseFloat(sale.venta_iva),
          ejercido: sale.ejercido ? parseFloat(sale.ejercido) : 0,
          utilidad: parseFloat(sale.utilidad),
          porcentaje: parseFloat(sale.porcentaje),
          NUM_COT: parseFloat(sale.NUM_COT),
          IMP_COT: parseFloat(sale.IMP_COT),
        }
      })

    } catch (error) {
      console.log(error)
    } finally {
      con.destroy()
    }



  }

}