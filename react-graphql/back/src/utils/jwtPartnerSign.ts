import jwt from 'jsonwebtoken'
import { Context } from '../context'
import { COOKIE_DOMAIN, COOKIE_PATH, PARTNER_ACCESS_TOKEN_NAME, PARTNER_JWT_EXPRISEIN } from '../values'
require('dotenv').config()

const jwtPartnerSign = (partnerId: string, ctx: Context) => {
    const token = jwt.sign({ partnerId }, process.env.JWT_SECRET as string, { expiresIn: PARTNER_JWT_EXPRISEIN })
    ctx.expressContext.res.cookie(PARTNER_ACCESS_TOKEN_NAME as string, token, {
        maxAge: PARTNER_JWT_EXPRISEIN,
        httpOnly: true,
        // sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        domain: COOKIE_DOMAIN,
        path: COOKIE_PATH
    })
    return
}

export default jwtPartnerSign