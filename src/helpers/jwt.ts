// import jwt from 'jsonwebtoken'

// export const generarJWT = ({ id, username }: { id: string, username: string }): Promise<string> => {

//   return new Promise((resolve, reject) => {
//     const userForToken = {
//       id,
//       username
//     }

//     jwt.sign(userForToken, process.env.SEED!, {
//       expiresIn: 60 * 60
//     }, (err, token) => {
//       if (err) {
//         console.log(err)
//         reject(err)
//       }

//       resolve(token)
//     })

//   })


}