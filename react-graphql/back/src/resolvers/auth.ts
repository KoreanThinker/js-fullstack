import { ObjectDefinitionBlock, stringArg } from '@nexus/schema/dist/core'
import bcrypt from 'bcrypt'
import jwtSign from '../utils/jwtSign'



//Mutation
export const signup = (t: ObjectDefinitionBlock<"Mutation">) => t.field('signup', {
    type: 'User',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true })
    },
    resolve: async (_, { email, password, name }, ctx) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await ctx.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name
                }
            })
            jwtSign(String(user.id), ctx)

            return user
        } catch (error) {
            switch (error.code) {
                case 'P2002': throw new Error('Duplicated email')
                default: throw new Error('Invalid Error')
            }
        }
    }
})

export const login = (t: ObjectDefinitionBlock<"Mutation">) => t.field('login', {
    type: 'User',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
    },
    resolve: async (_, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({ where: { email } })
        if (!user) throw new Error(`No such user found for email: ${email}`)

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new Error('Invalid password')

        jwtSign(String(user.id), ctx)
        return user
    }
})
