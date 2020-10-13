import { gql, QueryHookOptions } from "@apollo/client";
import { Item } from "../constants/types";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/ITEM
export const ITEM = gql`
    query ($itemId: Int!){
        item (id: $itemId) {
            id
            published
            name
            price
            images {
                id
                src
            }
        }
    }
`

interface ItemData {
    item: {
        id: number
        name: string
        images: { src: string, id: number }[]
        published: boolean
        price: number
    }
}

interface ItemVars {
    itemId: number
}
export const useItem = (options?: QueryHookOptions<ItemData, ItemVars>) => createQueryHook<ItemData, ItemVars>(ITEM, {
    fetchPolicy: 'cache-first',
    ...options
}) // SSR

// QUERY/MY_ITEM
export const MY_ITEM = gql`
    query {
        myItems {
            id
            published
            name
            mainImage
            price
        }
    }
`

interface MyItemsData {
    myItems: Item[]
}

interface MyItemsVars {

}
export const useMyItems = () => createQueryHook<MyItemsData, MyItemsVars>(MY_ITEM, {
    fetchPolicy: 'cache-first'
}) // SSR



// MUTATION/DELETE_ITEM
const DELETE_ITEM = gql`
    mutation ($itemId: Int!) {
        deleteItem (id: $itemId) 
    }
`
interface DeleteItemData {
    partnerDeleteItem: number
}
interface DeleteItemVars {
    itemId: number
}
export const useDeleteItem = () =>
    createMutationHook<DeleteItemData, DeleteItemVars>(
        DELETE_ITEM,
        {
            update: (cache, { data }) => {
                console.log(data?.partnerDeleteItem)
                cache.modify({
                    id: cache.identify({ __ref: `Item:${data?.partnerDeleteItem}` }),
                    fields: (_, { DELETE }) => DELETE
                })
            }
        })

// MUTATION/UPDATE_ITEM
const UPDATE_ITEM = gql`
mutation ($itemId: Int!, $name: String, $published: Boolean, $price: Int, $images: [Int!]) {
    updateItem(id: $itemId, name: $name, published:$published, price: $price, images: $images) {
        id
        published
        name
        price
        images {
            id
            src
        }
    }
}
`
interface UpdateItemData {
    updateItem: {
        id: number
        name: string
        images: { src: string, id: number }[]
        published: boolean
        price: number
    }
}
interface UpdateItemVars {
    itemId: number
    name?: string
    published?: boolean
    price?: number
    images?: number[]
}
export const useUpdateItem = () =>
    createMutationHook<UpdateItemData, UpdateItemVars>(
        UPDATE_ITEM,
        {

        })