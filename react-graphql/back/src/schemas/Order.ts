import { objectType } from "@nexus/schema"

const Order = objectType({
    name: 'Order',
    definition(t) {
        t.model.id()
        t.model.buyer()
        t.model.buyerId()
        t.model.createdAt()
        t.model.item()
        t.model.itemId()
        t.model.partner()
        t.model.partnerId()
        t.model.price()
    }
})

export default Order