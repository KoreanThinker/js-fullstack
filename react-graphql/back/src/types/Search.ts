import { objectType } from "@nexus/schema"

export const Search = objectType({
    name: 'Search',
    definition(t) {
        t.string('orderBy')
        t.int('count')
        t.list.field('items', { type: 'Item' })
    }
})