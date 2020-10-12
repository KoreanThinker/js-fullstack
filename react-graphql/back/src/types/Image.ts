import { objectType } from "@nexus/schema"
import { GraphQLUpload } from "graphql-upload"

export const Image = objectType({
    name: 'Image',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.item()
        t.model.itemId()
        t.model.src()
    }
})