import { intArg, ObjectDefinitionBlock } from "@nexus/schema/dist/core"

//Query
export const image = (t: ObjectDefinitionBlock<"Query">) => t.field('image', {
    type: 'Image',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.image.findOne({
            where: { id: Number(id) }
        })
    }
})
