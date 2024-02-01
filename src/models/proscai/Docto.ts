import mysql from 'mysql2/promise'
import { BRANCH_OFFICE_VALUES_DMULTICIA } from '../../helpers/branchOffice'
import { Docto } from '../../interfaces/docto.interface';


const COIN_VALUES = {
  1: {
    code: 'MXN',
    name: 'pesos'
  },
  2: {
    code: 'USD',
    name: 'dolares'
  }
}


const connection = async () => await mysql.createConnection({
  host: 'tuvansa.dyndns.org',
  user: 'consultas',
  password: 'consultas',
  database: 'tuvansa'
})



export class DoctoProscaiModel {

  static getAll = async () => {

    const conexion = await connection()

    try {

      const [payments] = await conexion.query(`
      SELECT 
      DSEQ ,
      DMULTICIA AS SUCURSAL,
      DNUM AS factura,
      DREFER AS ordenCompra ,
      DREFERELLOS AS supplierFactura,
      PRVCOD,
      PRVNOM AS NOMBRE,
      DCANTF AS importePesos,
      IF(DMONEDA=2,(DCANTF/DTIPOC),DCANTF) AS importeFactura,
      DCANT AS saldo,
      DMONEDA AS moneda,
      DTIPOC AS tipoCambio,
      DCANCELADA cancelada,
      DATE(DFECHA) fecha
      FROM FDOC
      LEFT JOIN FPRV ON FPRV.PRVSEQ=FDOC.PRVSEQ
      WHERE DESFACT=2 AND DCANCELADA=0 AND PRVCOD<>'' 
      AND DMULTICIA = 1 
      AND (mid(DNUM,1,1) = 'R' OR mid(DNUM,1,1) = 'G')

      order by dfecha desc
      limit 50
    `) as Array<any>

      return payments.map((payment): Docto => {

        const { SUCURSAL, PRVCOD, NOMBRE, DSEQ, moneda, cancelada, ...rest } = payment

        return {
          ...rest,
          idProscai: DSEQ.toString(),
          supplier: {
            uid: PRVCOD,
            name: NOMBRE
          },
          branchOffice: {
            code: typeof payment.SUCURSAL === 'number' ? `0${SUCURSAL}` : SUCURSAL,
            name: BRANCH_OFFICE_VALUES_DMULTICIA[SUCURSAL]
          },
          coin: {
            name: COIN_VALUES[moneda].name,
            code: COIN_VALUES[moneda].code
          }
        }

      })

    } catch (error) {
      console.log(error)
    } finally {
      conexion.destroy()
    }



  }

  static getById = async ({ id }: { id: string }) => {

    const conexion = await connection()

    try {


      let payment = await conexion.query(`
            SELECT 
            DSEQ ,
            DMULTICIA AS SUCURSAL,
            DNUM AS factura,
            DREFER AS ordenCompra ,
            DREFERELLOS AS supplierFactura,
            PRVCOD,
            PRVNOM AS NOMBRE,
            DCANTF AS importePesos,
            IF(DMONEDA=2,(DCANTF/DTIPOC),DCANTF) AS importeFactura,
            DCANT AS saldo,
            DMONEDA AS moneda,
            DTIPOC AS tipoCambio,
            DCANCELADA cancelada,
            DATE(DFECHA) fecha
            FROM FDOC
            LEFT JOIN FPRV ON FPRV.PRVSEQ=FDOC.PRVSEQ
            WHERE DESFACT=2 AND DCANCELADA=0 AND PRVCOD<>'' 
            AND DMULTICIA = 1 
            AND (mid(DNUM,1,1) = 'R' OR mid(DNUM,1,1) = 'G')
            AND DSEQ = '${id}'
          `) as any

      payment = payment[0][0]

      const { SUCURSAL, PRVCOD, NOMBRE, DSEQ, moneda, cancelada, ...rest } = payment

      return {
        ...rest,
        idProscai: DSEQ.toString(),
        supplier: {
          uid: PRVCOD,
          name: NOMBRE
        },
        branchOffice: {
          code: typeof payment.SUCURSAL === 'number' ? `0${SUCURSAL}` : SUCURSAL,
          name: BRANCH_OFFICE_VALUES_DMULTICIA[SUCURSAL]
        },
        coin: {
          name: COIN_VALUES[moneda].name,
          code: COIN_VALUES[moneda].code
        }
      }



    } catch (error) {
      console.log(error)
    } finally {
      conexion.destroy()
    }


  }

  static getBySupplier = async ({ supplierId }: { supplierId: string }) => {

    const con = await connection()

    const query = `
    SELECT 
      PRVCOD uid, 
      PRVNOM name,
      DFECHA fechaRegistro,
      AFECHA fechaPago,
      DNUM docto,
      DREFER referencia,
      DREFERELLOS referenciaEllos,
      DCANTF montoFactura,
      DCANT saldo,
      sum(ACANT) pagado
      FROM fax
    LEFT JOIN FDOC ON FDOC.DSEQ=FAX.DSEQ
    LEFT JOIN FPRV ON FPRV.PRVSEQ=FAX.PRVSEQ
    WHERE PRVCOD = ? AND DNUM = "RA07437" AND DESCXC=2 AND DCANT<>0 AND DESFACT=2 AND DCANCELADA=0
    GROUP BY PRVCOD,DNUM,ATIPMV
    ORDER BY PRVCOD,DNUM

    `

    const [suppliers] = await con.query(query, [supplierId]);

    console.log(suppliers)


    return suppliers

  }
}