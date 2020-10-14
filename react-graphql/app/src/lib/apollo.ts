import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import Config from "react-native-config";

export const createApolloClient = () => {
    return new ApolloClient({
        link: createHttpLink({
            uri: Config.GRAPHQL_SERVER_URL,
            credentials: 'include',
        }),
        cache: new InMemoryCache()
    })
}