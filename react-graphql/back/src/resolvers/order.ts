import { intArg, mutationField, queryField, stringArg } from "@nexus/schema"
import getPartnerId from "../utils/getPartnerId"

//Query
export const order = queryField('order', {
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



export const newOrder = queryField('newOrder', {
    type: 'Order',
    list: true,
    resolve: (_, { }, ctx) => {
        const partnerId = getPartnerId(ctx)
        return ctx.prisma.order.findMany({
            where: { AND: { partnerId, itemState: 'receiving' } }
        })
    }
})



// Mutation
export const createOrder = mutationField('createOrder', {
    type: 'Order',
    args: {
        price: intArg({ required: true }),
        itemId: intArg({ required: true })
    },
    resolve: async (_, { itemId, price }, ctx) => {
        // todo getUser by token
        const userId = 1

        const item = await ctx.prisma.item.findOne({ where: { id: itemId } })
        if (!item) throw new Error('No Item')
        if (item.price !== price) throw new Error('Price Error')
        if (!item.partnerId) throw new Error('No Partner')

        return ctx.prisma.order.create({
            data: {
                price,
                buyer: { connect: { id: userId } },
                partner: { connect: { id: item.partnerId } },
                item: { connect: { id: itemId } }
            }
        })

    }
})

export const userCancelOrder = mutationField('userCancelOrder', {
    type: 'Order',
    args: {
        orderId: intArg({ required: true })
    },
    resolve: async (_, { orderId }, ctx) => {
        // todo getUser by token
        const userId = 1

        const order = await ctx.prisma.order.findOne({ where: { id: orderId } })
        if (!order) throw new Error('No Order')
        if (order.buyerId !== userId) throw new Error('No Access')
        if (order.itemState === 'canceled') throw new Error('Already Canceled')
        if (order.itemState === 'confirmation') throw new Error('User Confirmed')
        if (order.itemState !== 'receiving') throw new Error('Order Already Been Started')

        return ctx.prisma.order.update({
            where: { id: orderId },
            data: {
                itemState: 'canceled'
            }
        })

    }
})

export const partnerCancelOrder = mutationField('partnerCancelOrder', {
    type: 'Order',
    args: {
        orderId: intArg({ required: true })
    },
    resolve: async (_, { orderId }, ctx) => {
        const partnerId = getPartnerId(ctx)

        const order = await ctx.prisma.order.findOne({ where: { id: orderId } })
        if (!order) throw new Error('No Order')
        if (order.partnerId !== partnerId) throw new Error('No Access')
        if (order.itemState === 'canceled') throw new Error('Already Canceled')

        return ctx.prisma.order.update({
            where: { id: orderId },
            data: {
                itemState: 'canceled'
            }
        })

    }
})

export const receiveOrder = mutationField('receiveOrder', {
    type: 'Order',
    args: {
        orderId: intArg({ required: true })
    },
    resolve: async (_, { orderId }, ctx) => {
        const partnerId = getPartnerId(ctx)

        const order = await ctx.prisma.order.findOne({ where: { id: orderId } })
        if (!order) throw new Error('No Order')
        if (order.partnerId !== partnerId) throw new Error('No Access')
        if (order.itemState !== 'receiving') throw new Error('No Access')

        return ctx.prisma.order.update({
            where: { id: orderId },
            data: {
                itemState: 'receiptCompleted'
            }
        })

    }
})

export const deliveryOrder = mutationField('deliveryOrder', {
    type: 'Order',
    args: {
        orderId: intArg({ required: true }),
        waybillNumber: stringArg({ required: true })
    },
    resolve: async (_, { orderId, waybillNumber }, ctx) => {
        const partnerId = getPartnerId(ctx)

        const order = await ctx.prisma.order.findOne({ where: { id: orderId } })
        if (!order) throw new Error('No Order')
        if (order.partnerId !== partnerId) throw new Error('No Access')
        if (order.itemState !== 'receiptCompleted') throw new Error('No Access')

        return ctx.prisma.order.update({
            where: { id: orderId },
            data: {
                itemState: 'deliveryProgress',
                waybillNumber
            }
        })

    }
})

// deliveryApiPlz
export const deliveryCompletedOrder = mutationField('deliveryCompletedOrder', {
    type: 'Order',
    args: {
        orderId: intArg({ required: true })
    },
    resolve: async (_, { orderId }, ctx) => {
        const partnerId = getPartnerId(ctx)

        const order = await ctx.prisma.order.findOne({ where: { id: orderId } })
        if (!order) throw new Error('No Order')
        if (order.partnerId !== partnerId) throw new Error('No Access')
        if (order.itemState !== 'deliveryProgress') throw new Error('No Access')

        return ctx.prisma.order.update({
            where: { id: orderId },
            data: {
                itemState: 'deliveryCompleted'
            }
        })

    }
})

export const confirmationOrder = mutationField('confirmationOrder', {
    type: 'Order',
    args: {
        orderId: intArg({ required: true })
    },
    resolve: async (_, { orderId }, ctx) => {
        // todo getUser by token
        const userId = 1

        const order = await ctx.prisma.order.findOne({ where: { id: orderId } })
        if (!order) throw new Error('No Order')
        if (order.buyerId !== userId) throw new Error('No Access')
        if (order.itemState !== 'deliveryCompleted') throw new Error('No Access')

        return ctx.prisma.order.update({
            where: { id: orderId },
            data: {
                itemState: 'confirmation'
            }
        })

    }
})