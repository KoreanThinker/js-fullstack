import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';


const link = createHttpLink({
    uri: process.env.GRAPHQL_SERVER_URL,
    credentials: 'include',
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // }
});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

export default client