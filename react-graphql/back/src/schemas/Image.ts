import { objectType } from "@nexus/schema"

const Image = objectType({
    name: 'Image',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.item()
        t.model.itemId()
        t.model.src()
    }
})

export default Image