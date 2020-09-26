import { intArg, ObjectDefinitionBlock } from "@nexus/schema/dist/core"

//Query
export const item = (t: ObjectDefinitionBlock<"Query">) => t.field('item', {
    type: 'Item',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.item.findOne({
            where: { id: Number(id) }
        })
    }
})
