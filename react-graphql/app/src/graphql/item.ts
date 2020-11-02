import { gql, QueryHookOptions, useApolloClient } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/ITEMS
export const ITEMS = gql`
  query Items ($offset: Int){
    items(offset: $offset) {
      id
      createdAt
      price
      mainImage
      name
    }
  }
`
export interface ItemsItem {
  id: number
  createdAt: string
  price: number
  mainImage: string
  name: string
}
interface ItemsData {
  items: ItemsItem[]
}
interface ItemsVars {
  offset?: number
}
export const useItems = (options?: QueryHookOptions<ItemsData, ItemsVars>) => createQueryHook<ItemsData, ItemsVars>(ITEMS, {
  ...options,

})