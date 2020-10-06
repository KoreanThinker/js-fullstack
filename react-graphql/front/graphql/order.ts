import { gql } from "@apollo/client";
import { ItemState } from "../constants/types";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";



// QUERY/NEW_ORDER
export const NEW_ORDER = gql`
    query {
        newOrder {
            id
            itemState
            price
            item {
                id
                mainImage
                name
            }
        }
    }
`
export interface NewOrder {
    id: number
    price: number
    itemState: ItemState
    item: {
        id: number
        mainImage: string
        name: string
    }
}
interface NewOrderData {
    newOrder: NewOrder[]
}

interface NewOrderVars {

}
export const useNewOrder = () => createQueryHook<NewOrderData, NewOrderVars>(NEW_ORDER, {
    fetchPolicy: 'cache-first'
}) // SSR


// MUTATION/CANCEL_ORDER
const CANCEL_ORDER = gql`
    mutation ($orderId: Int!) {
        partnerCancelOrder (orderId: $orderId) {
            id
            itemState
            updatedAt
            createdAt
        }
    }
`
interface CancelOrderData {
    partnerCancelOrder: {
        id: string
        itemState: ItemState
    }
}
interface CancelOrderVars {
    orderId: number
}
export const useCancelOrder = () => createMutationHook<CancelOrderData, CancelOrderVars>(CANCEL_ORDER)

// MUTATION/RECEIVE_ORDER
const RECEIVE_ORDER = gql`
    mutation ($orderId: Int!) {
        receiveOrder (orderId: $orderId) {
            id
            itemState
        }
    }
`
interface ReceiveOrderData {
    receiveOrder: {
        id: string
        itemState: ItemState
    }
}
interface ReceiveOrderVars {
    orderId: number
}
export const useReceiveOrder = () => createMutationHook<ReceiveOrderData, ReceiveOrderVars>(RECEIVE_ORDER)