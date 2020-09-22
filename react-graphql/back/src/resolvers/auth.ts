import { ObjectDefinitionBlock, stringArg } from '@nexus/schema/dist/core'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//Mutation
export const signup = (t: ObjectDefinitionBlock<"Mutation">) => t.field('signup', {
    type: 'Auth',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true })
    },
    resolve: async (_, { email, password, name }, ctx) => {
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await ctx.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })
        const token = jwt.sign({ userId: String(user.id) }, process.env.JWT_SECRET as string)
        return { token, user }
    }
})

export const login = (t: ObjectDefinitionBlock<"Mutation">) => t.field('login', {
    type: 'Auth',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
    },
    resolve: async (_, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({ where: { email } })
        if (!user) throw new Error(`No such user found for email: ${email}`)

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new Error('Invalid password')

        const token = jwt.sign({ userId: String(user.id) }, process.env.JWT_SECRET as string)
        return { token, user }
    }
})
