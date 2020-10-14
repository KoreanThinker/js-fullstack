import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { GRAPHQL_SERVER_URL } from '../../env'

export const client = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_SERVER_URL,
        credentials: 'include',
    }),
    cache: new InMemoryCache(),
    connectToDevTools: true
})