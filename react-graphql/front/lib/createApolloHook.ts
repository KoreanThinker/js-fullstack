import { MutationHookOptions, useMutation, QueryHookOptions, useQuery } from "@apollo/client"
import { DocumentNode } from "graphql"

export const createMutationHook = <Data, Vars>(mutation: DocumentNode, options?: MutationHookOptions<Data, Vars>) => useMutation<Data, Vars>(mutation, options)
export const createQueryHook = <Data, Vars>(query: DocumentNode, options?: QueryHookOptions<Data, Vars>) => useQuery<Data, Vars>(query, options)