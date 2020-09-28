import { objectType } from "@nexus/schema"
import { image } from "../resolvers/image"
import { item } from "../resolvers/item"
import { order } from "../resolvers/order"
import { iPartner, isPartnerLoggedIn, partner } from "../resolvers/partner"
import { iUser, user } from "../resolvers/user"

const Query = objectType({
    name: 'Query',
    definition(t) {
        //user
        user(t)
        iUser(t)
        //image
        image(t)
        //item
        item(t)
        //order
        order(t)
        //partner
        partner(t)
        iPartner(t)
        isPartnerLoggedIn(t)
    },
})

export default Query