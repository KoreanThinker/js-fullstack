import { inputObjectType, objectType } from "@nexus/schema"

export const Item = objectType({
    name: 'Item',
    definition(t) {
        t.model.id()
        t.model.buyers()
        t.model.createdAt()
        t.model.images()
        t.model.name()
        t.model.order()
        t.model.partner()
        t.model.partnerId()
        t.model.price()
        t.model.published()
        t.model.updatedAt()
    }
})