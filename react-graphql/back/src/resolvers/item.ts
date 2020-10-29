import { arg, booleanArg, idArg, inputObjectType, intArg, mutationField, queryField, stringArg } from "@nexus/schema"
import getPartnerId from '../utils/getPartnerId'

//Query
export const item = queryField('item', {
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

export const items = queryField('items', {
    type: 'Item',
    list: true,
    nullable: true,
    resolve: (_, { }, ctx) => {
        return ctx.prisma.item.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' }
        })
    }
})

export const myItems = queryField('myItems', {
    type: 'Item',
    list: true,
    nullable: true,
    resolve: (_, { }, ctx) => {
        const partnerId = getPartnerId(ctx)
        return ctx.prisma.item.findMany({
            where: { partnerId },
            orderBy: { createdAt: 'desc' }
        })
    }
})


//Mutation
export const createItem = mutationField('createItem', {
    type: 'Item',
    args: {
        name: stringArg({ required: true }),
        price: intArg({ required: true }),
        images: stringArg({ list: true, required: true }),
        options: arg({ type: 'OptionsInput', list: true, required: true })
    },
    nullable: true,
    resolve: async (_, { name, price, images, options }, ctx) => {
        const partnerId = getPartnerId(ctx)
        return ctx.prisma.item.create({
            data: {
                name,
                price,
                images: { create: images.map((src) => ({ src })) },
                partner: { connect: { id: partnerId } },
                options: { create: options.map(({ optionItems }) => ({ optionItems: { create: optionItems.map(({ name, price }) => ({ name, price })) } })) }
            }
        })
    }
})

export const deleteItem = mutationField('deleteItem', {
    type: 'Int',
    args: {
        id: intArg({ required: true })
    },
    nullable: true,
    resolve: async (_, { id }, ctx) => {
        const partnerId = getPartnerId(ctx)
        const item = await ctx.prisma.item.findOne({ where: { id } })
        if (item?.partnerId !== partnerId) throw new Error('No Access')
        await ctx.prisma.item.delete({ where: { id } })
        return id
    }
})

export const updateItem = mutationField('updateItem', {
    type: 'Item',
    args: {
        id: intArg({ required: true }),
        name: stringArg({ nullable: true }),
        price: intArg({ nullable: true }),
        images: intArg({ list: true, nullable: true }),
        published: booleanArg({ nullable: true }),
        options: arg({ type: 'OptionsInput', list: true, required: true })
    },
    nullable: true,
    resolve: async (_, { id, name, price, images, published, options }, ctx) => {
        try {
            const partnerId = getPartnerId(ctx)
            const item = await ctx.prisma.item.findOne({ where: { id } })
            if (item?.partnerId !== partnerId) throw new Error('No Access')
            if (options) {
                //remove cart
                await ctx.prisma.cartItem.deleteMany({ where: { itemId: id } })
                //remove optionItems
                await ctx.prisma.optionItem.deleteMany({ where: { option: { itemId: id } } })
                //remove options
                await ctx.prisma.option.deleteMany({ where: { itemId: id } })
            }
            return ctx.prisma.item.update({
                where: { id },
                data: {
                    name: name || undefined,
                    price: price || undefined,
                    published: typeof published === 'boolean' ? published : undefined,
                    images: images ? { set: images.map(id => ({ id })) } : undefined,
                    options: options ? { create: options.map(({ optionItems }) => ({ optionItems: { create: optionItems.map(({ name, price }) => ({ name, price })) } })) } : undefined
                }
            })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

    }
})