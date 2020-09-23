import { intArg, ObjectDefinitionBlock } from "@nexus/schema/dist/core"
import getUserId from "../utils/getUserId"
import { ACCESS_TOKEN_NAME } from "../values"

//Query
export const user = (t: ObjectDefinitionBlock<"Query">) => t.field('user', {
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

export const iUser = (t: ObjectDefinitionBlock<"Query">) => t.field('iUser', {
    type: 'User',
    nullable: true,
    resolve: async (_, { }, ctx) => {
        try {
            const userId = getUserId(ctx)
            const user = ctx.prisma.user.findOne({
                where: { id: Number(userId) }
            })
            if (!user) throw new Error('Invalid User')
            return user
        } catch (error) {
            ctx.expressContext.res.clearCookie(ACCESS_TOKEN_NAME)
            throw new Error('Invalid Error')
        }
    }
})

//Mutation
export const updateUser = (t: ObjectDefinitionBlock<"Mutation">) => t.field('updateUser', {
    type: 'User',
    args: {
        id: intArg({ required: true }),
        test: intArg({ required: true }),
    },
    resolve: (_, { id, test }, ctx) => {
        return ctx.prisma.user.update({
            where: { id },
            data: { test }
        })
    }
})