import { intArg, mutationField, queryField, stringArg } from "@nexus/schema"
import getUserId from "../utils/getUserId"
import bcrypt from 'bcrypt'
import { USER_ACCESS_TOKEN_NAME } from "../values"
import jwtUserSign from "../utils/jwtUserSign"
import { resolve } from "path"
import Axios from "axios"
import { errorMonitor } from "ws"

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
    type: 'User',
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
    type: 'User',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
    },
    async resolve(_, { email, password }, ctx) {
        const user = await ctx.prisma.user.findOne({ where: { email } })
        if (!user) throw new Error(`No such user found for email: ${email}`)

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new Error('Invalid password')

        jwtUserSign(String(user.id), ctx)
        return user
    }
})

export const userKakaoLogin = mutationField('userKakaoLogin', {
    type: 'User',
    args: {
        token: stringArg({ required: true })
    },
    async resolve(_, { token }, ctx) {
        try {
            console.log(token)
        } catch (error) {

        }
    }
})

export const userFacebookLogin = mutationField('userFacebookLogin', {
    type: 'User',
    args: {
        token: stringArg({ required: true })
    },
    async resolve(_, { token }, ctx) {
        try {
            const result = await Axios(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`)
            const { name, email }: { name: string, email: string } = result.data
            const user = await ctx.prisma.user.findOne({ where: { email } })
            if (user) { //login
                if (user.sns !== 'fa') throw new Error('This email was used in a different way')
                jwtUserSign(String(user.id), ctx)
                return user
            } else { // create account and login
                const newUser = await ctx.prisma.user.create({ data: { email, name, sns: 'fa' } })
                jwtUserSign(String(newUser.id), ctx)
                return newUser
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})

export const userLogout = mutationField('userLogout', {
    type: 'User',
    nullable: true,
    resolve(_, { }, ctx) {
        ctx.expressContext.res.clearCookie(USER_ACCESS_TOKEN_NAME)
        return null
    }
})