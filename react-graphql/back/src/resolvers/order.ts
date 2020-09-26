import { intArg, ObjectDefinitionBlock } from "@nexus/schema/dist/core"

//Query
export const order = (t: ObjectDefinitionBlock<"Query">) => t.field('order', {
    type: 'Order',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.order.findOne({
            where: { id: Number(id) }
        })
    }
})
