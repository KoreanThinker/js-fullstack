import jwt from 'jsonwebtoken'
import { Context } from '../context'
import { ACCESS_TOKEN_NAME } from '../values'

require('dotenv').config()

const getUserId = (ctx: Context) => {
    const accessToken = ctx.expressContext.req.cookies[ACCESS_TOKEN_NAME]
    if (accessToken) {
        const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET as string) as { userId: string }
        return userId
    }
    throw new AuthError()
}

class AuthError extends Error {
    constructor() {
        super('Not authorized')
    }
}

export default getUserId