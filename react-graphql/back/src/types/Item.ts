import { objectType } from "@nexus/schema"

export const Item = objectType({
    name: 'Item',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.images()
        t.model.name()
        t.model.order()
        t.model.partner()
        t.model.partnerId()
        t.model.price()
        t.model.published()
        t.model.updatedAt()
        t.model.CartItem()
        t.model.options()
        t.model.orderCount()
        t.string('mainImage', async ({ id }, { }, ctx) => {
            const images = await ctx.prisma.image.findMany({
                where: { itemId: id },
                take: 1
            })
            return images[0].src
        })
    }
})