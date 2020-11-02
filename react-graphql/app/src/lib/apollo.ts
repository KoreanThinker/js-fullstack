import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { GRAPHQL_SERVER_URL } from '../../env'

export const client = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_SERVER_URL,
        credentials: 'include',
    }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    items: offsetLimitPagination(),
                },
            },
        }
    }),
    connectToDevTools: true
})