import { objectType } from "@nexus/schema"
import { image } from "../resolvers/image"
import { item, items, myItems } from "../resolvers/item"
import { newOrder, order } from "../resolvers/order"
import { iPartner, isPartnerLoggedIn, partner } from "../resolvers/partner"
import { iUser, user } from "../resolvers/user"

export const Query = objectType({
    name: 'Query',
    definition(t) {
        //user
        user(t)
        iUser(t)
        //image
        image(t)
        //item
        item(t)
        items(t)
        myItems(t)
        //order
        order(t)
        newOrder(t)
        //partner
        partner(t)
        iPartner(t)
        isPartnerLoggedIn(t)
    },
})