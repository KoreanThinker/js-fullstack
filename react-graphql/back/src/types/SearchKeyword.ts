import { objectType } from "@nexus/schema"

export const SearchKeyword = objectType({
    name: 'SearchKeyword',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.keyword()
        t.model.User()
        t.model.userId()
    }
})