import { intArg, mutationField, queryField, stringArg } from "@nexus/schema"
import getUserId from "../utils/getUserId"
import bcrypt from 'bcrypt'
import { USER_ACCESS_TOKEN_NAME } from "../values"
import jwtUserSign from "../utils/jwtUserSign"

//Query
export const user = queryField('user', {
    type: 'User',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.user.findOne({
            where: { id: Number(id) }
        })
    }
})

export const iUser = queryField('iUser', {
    type: 'IUser',
    nullable: true,
    resolve: async (_, { }, ctx) => {
        try {
            const userId = getUserId(ctx)
            const user = await ctx.prisma.user.findOne({
                where: { id: Number(userId) }
            })
            if (!user) throw new Error('Invalid User')
            // user.id = -1 // used in apollo cache
            return user
        } catch (error) {
            ctx.expressContext.res.clearCookie(USER_ACCESS_TOKEN_NAME)
            throw new Error('Invalid Error')
        }
    }
})

//Mutation
export const userLogin = mutationField('userLogin', {
    type: 'IUser',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
    },
    async resolve(_, { email, password }, ctx) {
        const user = await ctx.prisma.user.findOne({ where: { email } })
        if (!user) throw new Error(`No such user found for email: ${email}`)

        // const valid = await bcrypt.compare(password, user.password)
        // if (!valid) throw new Error('Invalid password')
        // user.id = -1 // used in apollo cache
        jwtUserSign(String(user.id), ctx)
        return user
    }
})

export const userLogout = mutationField('userLogout', {
    type: 'IUser',
    nullable: true,
    resolve(_, { }, ctx) {
        ctx.expressContext.res.clearCookie(USER_ACCESS_TOKEN_NAME)
        return null
    }
})