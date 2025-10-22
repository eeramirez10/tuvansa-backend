import { RowDataPacket } from "mysql2";
import { connection } from "../../config/mysql"
import { getCurrentDay, getCurrentMonth, getCurrentYear, getLastDayOfMonth } from "../../helpers/date";

import indexByCp from '../../data/indexed-cp-mex.json'

interface RemissionProscai extends RowDataPacket {

  DSEQ: number
  DFECHA: string
  DNUM: string
  DREFER: string
  DREFERELLOS: string
  CLIENTE: string
  IMPORTE: string
  AGDESCR: string

}

interface SalesByState extends RowDataPacket {
  SUCURSAL: string
  YEAR: string
  MES: string
  FAMILIA: string
  CLAVE: string
  DESCRIPCION: string
  ID_CLIENTE: string
  CLIENTE: string
  CP: string
  VENTA: string
  COSTO: string

}

interface StatesPostalCodes {
  postalCode: string
  countryCode: string
  name: string
}

interface SalesByPostalCodeOptions {
  year?: string
  customerId?: string
}

export class SalesProscaiModel {

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

  static getSalesByPostalCode = async (options: SalesByPostalCodeOptions) => {
    const con = await connection()

    const year = options.year ?? getCurrentYear()

    const customerId = options.customerId


    const searchByCustomerId = customerId === null || customerId === undefined  || customerId === 'undefined' ? '' : `AND CLICOD = '${customerId}'`
    const groupByClicod = customerId === null || customerId === undefined || customerId === 'undefined' ? 'GROUP BY CLICP' : 'GROUP BY CLICOD, FAMB.FAMDESCR'

    // console.log({ searchByCustomerId, groupByClicod })


    const consulta = `
      SELECT 
      CASE DMULTICIA
              WHEN 1 THEN '01 MEXICO'
      END AS SUCURSAL,
      DATE_FORMAT(DFECHA,'%Y') AS YEAR,
      CASE DATE_FORMAT(DFECHA,'%m')
              WHEN '01' THEN '01 ENE'
              WHEN '02' THEN '02 FEB'
              WHEN '03' THEN '03 MAR'
              WHEN '04' THEN '04 ABR'
              WHEN '05' THEN '05 MAY'
              WHEN '06' THEN '06 JUN'
              WHEN '07' THEN '07 JUL'
              WHEN '08' THEN '08 AGO'
              WHEN '09' THEN '09 SEP'
              WHEN '10' THEN '10 OCT'
              WHEN '11' THEN '11 NOV'
              WHEN '12' THEN '12 DIC'
      END AS MES,
      FAMB.FAMDESCR AS FAMILIA,IEAN AS CLAVE,IDESCR AS DESCRIPCION,CLICOD AS ID_CLIENTE, CLINOM AS CLIENTE,CLICP AS CP,SUM(AICANTF*AIPRECIO) AS VENTA,SUM(AICANTF*AICOSTO) AS COSTO
      FROM FAXINV
      LEFT JOIN FDOC ON FDOC.DSEQ=FAXINV.DSEQ
      LEFT JOIN FINV ON FINV.ISEQ=FAXINV.ISEQ
      LEFT JOIN FCLI ON FCLI.CLISEQ=FDOC.CLISEQ
      LEFT JOIN FFAM AS FAMB ON FAMB.FAMTNUM=FINV.IFAMB
      WHERE (mid(DNUM,1,1)='F' OR mid(DNUM,1,1)='D') ${searchByCustomerId} AND ITIPO<>4 AND DCANCELADA = 0 AND (DFECHA>='2020-01-01' AND DFECHA<='2024-12-31') AND DSTATUSCFD=3 AND DMULTICIA=1 AND DATE_FORMAT(DFECHA,'%Y') = ?
      ${groupByClicod}
      ORDER BY DATE_FORMAT(DFECHA,'%Y'),DATE_FORMAT(DFECHA,'%m'),SUCURSAL,CLICOD,IFAMB,ICOD

    `


    try {

      const [sales] = await con.query<SalesByState[]>(consulta, [year])

      // const indexByCp = statesPostalCodes.reduce((acc, current) => {
      //   acc[current.postalCode] = current
      //   return acc
      // }, {} as Record<number, typeof sales[0]>)

      const mapSales = sales.map(sale => ({
        ...sale,
        ESTADO: indexByCp[sale.CP]?.name ?? null
      }))

      // const groupByState = Object.values(
      //   mapSales.reduce((acc, current) => {
      //     const estado = current.ESTADO

      //     if (!acc[estado]) {
      //       acc[estado] = {
      //         estado,
      //         venta: 0,
      //         costo: 0,
      //       }
      //     }

      //     // acc[estado].push(current)

      //     acc[estado].venta += parseFloat(current.VENTA)
      //     acc[estado].costo += parseFloat(current.COSTO)

      //     return acc
      //   }, {})
      // )






      return mapSales

    } catch (error) {
      console.log(error)
    } finally {
      con.destroy()
    }

  }

  static getRemissions = async () => {
    const con = await connection()

    const consulta = `
    SELECT DSEQ,DFECHA,DNUM,DREFER,DREFERELLOS,CONCAT(CLICOD,' ',CLINOM) AS CLIENTE,DCANTF AS IMPORTE,AG1.AGDESCR FROM FDOC
    LEFT JOIN FCLI ON FCLI.CLISEQ=FDOC.CLISEQ
    LEFT JOIN FAG AS AG1 ON AG1.AGTNUM=FDOC.DPAR1
    WHERE DMULTICIA=1 AND DESFACT=1 AND mid(DNUM,1,2)='FA' AND DFECHA>='2024-06-01' AND DCANCELADA=0
    ORDER BY DFECHA desc
    limit 5
    
    `;

    try {
      const [remissions] = await con.query<RemissionProscai[]>(consulta)


      return remissions

    } catch (error) {
      console.log(error)

    } finally {
      con.destroy()
    }




  }

  static getRemission = async (id: number) => {
    const con = await connection()

    const consulta = `
    SELECT DSEQ,DFECHA,DNUM,DREFER,DREFERELLOS,CONCAT(CLICOD,' ',CLINOM) AS CLIENTE,DCANTF AS IMPORTE,AG1.AGDESCR FROM FDOC
    LEFT JOIN FCLI ON FCLI.CLISEQ=FDOC.CLISEQ
    LEFT JOIN FAG AS AG1 ON AG1.AGTNUM=FDOC.DPAR1
    WHERE DMULTICIA=1 AND DESFACT=1 AND mid(DNUM,1,2)='FA' AND DCANCELADA=0 and DSEQ = ${id}
    ORDER BY DFECHA desc
    
    
    `;

    try {

      const [remission] = await con.query<RemissionProscai[]>(consulta)


      return remission[0]

    } catch (error) {
      console.log(error)

    } finally {
      con.destroy()
    }
  }

}