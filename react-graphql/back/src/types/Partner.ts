import { objectType } from "@nexus/schema"

export const Partner = objectType({
    name: 'Partner',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.password()
        t.model.createdAt()
        t.model.items()
        t.model.orders()
        t.model.profit()
    }
})