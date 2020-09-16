import { intArg, ObjectDefinitionBlock } from "@nexus/schema/dist/core"

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