import { intArg, ObjectDefinitionBlock } from "@nexus/schema/dist/core"

//Query
export const partner = (t: ObjectDefinitionBlock<"Query">) => t.field('partner', {
    type: 'Partner',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.partner.findOne({
            where: { id: Number(id) }
        })
    }
})
