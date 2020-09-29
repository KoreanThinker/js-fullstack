import { objectType } from "@nexus/schema"
import { createItem, deleteItem, updateItem } from "../resolvers/item"
import { createOrder, partnerCancelOrder, userCancelOrder } from "../resolvers/order"
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
        //order
        createOrder(t)
        userCancelOrder(t)
        partnerCancelOrder(t)
    }
})