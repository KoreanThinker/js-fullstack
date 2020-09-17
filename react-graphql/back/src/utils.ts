import jwt from 'jsonwebtoken'
import { Context } from './context'

require('dotenv').config()

export const getUserId = (ctx: Context) => {
    const Authorization = ctx.expressContext.req.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
        return userId
    }
    throw new AuthError()
}

class AuthError extends Error {
    constructor() {
        super('Not authorized')
    }
}