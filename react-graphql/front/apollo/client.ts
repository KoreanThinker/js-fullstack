import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_SERVER_URL,
    cache: new InMemoryCache(),
    credentials: 'include'
})

export default client