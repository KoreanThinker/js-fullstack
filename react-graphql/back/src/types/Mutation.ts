import { objectType } from "@nexus/schema"
import { partnerLogin, partnerLogout, partnerSignup } from "../resolvers/partner"

export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //partner
        partnerSignup(t)
        partnerLogin(t)
        partnerLogout(t)
    }
})