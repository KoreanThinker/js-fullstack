import jwt from 'jsonwebtoken'
import { Context } from '../context'
import { PARTNER_ACCESS_TOKEN_NAME, PARTNER_JWT_EXPRISEIN } from '../values'
require('dotenv').config()

const jwtPartnerSign = (partnerId: string, ctx: Context) => {
    const token = jwt.sign({ partnerId }, process.env.JWT_SECRET as string, { expiresIn: PARTNER_JWT_EXPRISEIN })
    ctx.expressContext.res.cookie(PARTNER_ACCESS_TOKEN_NAME as string, token, {
        maxAge: PARTNER_JWT_EXPRISEIN,
        httpOnly: true,
        // secure: true,
        // domain: process.env.NODE_ENV === 'production' && '.domain.com'
    })
    return
}

export default jwtPartnerSign