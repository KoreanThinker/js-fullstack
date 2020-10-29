import { intArg, queryField, mutationField } from "@nexus/schema"
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders"
import getUserId from "../utils/getUserId"

//Query
//Mutation
export const addCart = mutationField('addCart', {
    type: 'CartItem',
    args: {
        itemId: intArg({ required: true }),
        quantity: intArg({ required: true }),
        optionItemIds: intArg({ required: true, list: true })
    },
    resolve: async (_, { itemId, quantity, optionItemIds }, ctx) => {
        const userId = getUserId(ctx)
        const item = await ctx.prisma.item.findOne({ where: { id: itemId }, include: { options: { include: { optionItems: true } } } })
        if (!item) throw new Error('Invalide Item Id')
        if (optionItemIds.length !== item.options.length) throw new Error('Require More Option')
        // optionItemIds check
        for (let i = 0; i < item.options.length; i++) {
            //if item.options.optionItems not include optionsItemIds[0]
            if (item.options[i].optionItems.filter(v => v.id === optionItemIds[i]).length === 0) throw new Error('Option Error')
        }

        const cartItem = await ctx.prisma.cartItem.create({
            data: {
                quantity,
                User: { connect: { id: userId } },
                item: { connect: { id: itemId } },
                currentOptions: { connect: optionItemIds.map((id) => ({ id })) }
            }
        })
        return cartItem
    }
})

export const removeCart = mutationField('removeCart', {
    type: 'CartItem',
    args: {
        cartItemIds: intArg({ required: true, list: true })
    },
    nullable: true,
    resolve: async (_, { cartItemIds }, ctx) => {
        const userId = getUserId(ctx)
        const user = await ctx.prisma.user.findOne({ where: { id: userId }, include: { cart: true } })
        if (!user) throw new Error('No Access')
        const userCartItemIds = user.cart.map(({ id }) => id)
        if (cartItemIds.filter((id) => !userCartItemIds.includes(id)).length !== 0) throw new Error('No Item In Your Cart')
        await ctx.prisma.cartItem.deleteMany({ where: { id: { in: cartItemIds } } })
        return null
    }
})