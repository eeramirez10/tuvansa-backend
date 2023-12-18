import mysql from 'mysql2/promise'


const connection = async () => await mysql.createConnection({
  host: 'tuvansa.dyndns.org',
  user: 'consultas',
  password: 'consultas',
  database: 'tuvansa'
})



export class DoctoModel {


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