import { arg, intArg, ObjectDefinitionBlock, stringArg } from "@nexus/schema/dist/core"
import getPartnerId from '../utils/getPartnerId'
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


//Mutation
// export const createItem = (t: ObjectDefinitionBlock<"Mutation">) => t.field('createItem', {
//     type: 'Item',
//     args: {
//         name: stringArg({ required: true }),
//         price: intArg({ required: true }),
//         images: stringArg({ list: true })
//     },
//     nullable: true,
//     resolve: async (_, { name, price }, ctx) => {
//         const parterId = getPartnerId(ctx)
//         return ctx.prisma.item.create({
//             data: {
//                 name,
//                 price,
//                 images: ,
//                 partner: parterId

//             }
//         })
//     }
// })
