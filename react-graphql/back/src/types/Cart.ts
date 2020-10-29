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
    }
})