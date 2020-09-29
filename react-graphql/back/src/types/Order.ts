import { objectType } from "@nexus/schema"

export const Order = objectType({
    name: 'Order',
    definition(t) {
        t.model.id()
        t.model.buyer()
        t.model.buyerId()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.item()
        t.model.itemId()
        t.model.partner()
        t.model.partnerId()
        t.model.price()
        t.model.itemState()
        t.model.waybillNumber()
    }
})