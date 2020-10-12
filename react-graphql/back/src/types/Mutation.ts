import { objectType } from "@nexus/schema"
import { GraphQLUpload } from "graphql-upload"
import { uploadImage } from "../resolvers/image"
import { createItem, deleteItem, updateItem } from "../resolvers/item"
import { confirmationOrder, createOrder, deliveryCompletedOrder, deliveryOrder, partnerCancelOrder, receiveOrder, userCancelOrder } from "../resolvers/order"
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
        receiveOrder(t)
        deliveryOrder(t)
        deliveryCompletedOrder(t)
        confirmationOrder(t)
        //image
        uploadImage(t)
    }
})