import { objectType } from "@nexus/schema"

export const Option = objectType({
    name: 'Option',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.item()
        t.model.itemId()
        t.model.optionItems()
    }
})

export const OptionItem = objectType({
    name: 'OptionItem',
    definition(t) {
        t.model.id()
        t.model.cartItems()
        t.model.name()
        t.model.option()
        t.model.optionId()
        t.model.price()
    }
})