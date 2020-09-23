import jwt from 'jsonwebtoken'
import { Context } from '../context'
import { ACCESS_TOKEN_NAME, JWT_EXPRISEIN } from '../values'
require('dotenv').config()

const jwtSign = (userId: string, ctx: Context) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: JWT_EXPRISEIN })
    ctx.expressContext.res.cookie(ACCESS_TOKEN_NAME as string, token, {
        maxAge: JWT_EXPRISEIN,
        httpOnly: true,
        // secure: true
    })
    console.log(token)
}

export default jwtSign