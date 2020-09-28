import jwt from 'jsonwebtoken'
import { Context } from '../context'
import { PARTNER_ACCESS_TOKEN_NAME } from '../values'

require('dotenv').config()

const getUserId = (ctx: Context) => {
    const accessToken = ctx.expressContext.req.cookies[PARTNER_ACCESS_TOKEN_NAME]
    console.log('ACCESS_TOKEN : ' + accessToken)
    if (accessToken) {
        const { partnerId } = jwt.verify(accessToken, process.env.JWT_SECRET as string) as { partnerId: string }
        return partnerId
    }
    throw new AuthError()
}

class AuthError extends Error {
    constructor() {
        super('Not authorized')
    }
}

export default getUserId