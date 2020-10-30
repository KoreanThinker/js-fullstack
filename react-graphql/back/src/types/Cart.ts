import { objectType } from "@nexus/schema"

export const CartItem = objectType({
    name: 'CartItem',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.currentOptions()
        t.model.item()
        t.model.itemId()
        t.model.quantity()
        t.int('totalPrice', {
            async resolve({ id }, { }, ctx) {
                const cartItem = await ctx.prisma.cartItem.findOne({ where: { id }, include: { currentOptions: { select: { price: true } }, item: { select: { price: true }, } } })
                if (!cartItem) throw new Error('No Item')
                let totalPrice = 0
                totalPrice += cartItem.item.price
                for (const { price } of cartItem.currentOptions) totalPrice += price
                return totalPrice * cartItem.quantity
            }
        })
    }
})