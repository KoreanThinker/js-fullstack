import jwt from 'jsonwebtoken'
import { Context } from '../context'
import { USER_ACCESS_TOKEN_NAME } from '../values'

require('dotenv').config()

const getUserId = (ctx: Context) => {
    const accessToken = ctx.expressContext.req.cookies[USER_ACCESS_TOKEN_NAME]
    // console.log('USER_ACCESS_TOKEN : ' + accessToken)
    if (accessToken) {
        const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET as string) as { userId: string }
        return Number(userId)
    }
    throw new AuthError()
}

class AuthError extends Error {
    constructor() {
        super('Not authorized')
    }
}

export default getUserId