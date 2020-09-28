import { objectType } from "@nexus/schema"
import { createItem, deleteItem, updateItem } from "../resolvers/item"
import { partnerLogin, partnerLogout, partnerSignup } from "../resolvers/partner"

export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //partner
        partnerSignup(t)
        partnerLogin(t)
        partnerLogout(t)
        //item
        createItem(t)
        deleteItem(t)
        updateItem(t)
    }
})