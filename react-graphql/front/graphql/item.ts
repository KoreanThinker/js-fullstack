import { gql } from "@apollo/client";
import { Item } from "../constants/types";
import { initializeApollo } from "../lib/apollo";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";



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
    deleteItem: number
}
interface DeleteItemVars {
    itemId: number
}
export const useDeleteItem = () =>
    createMutationHook<DeleteItemData, DeleteItemVars>(
        DELETE_ITEM,
        {
            update: (cache, { data }) => {
                console.log(data?.deleteItem)
                cache.modify({
                    id: cache.identify({ __ref: `Item:${data?.deleteItem}` }),
                    fields: (_, { DELETE }) => DELETE
                })
            }
        })