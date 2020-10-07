import { DocumentNode } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import { IS_LOGGED_IN } from "../graphql/auth"
import { initializeApollo } from "./apollo"

interface Query {
    query: DocumentNode,
    variables?: any
}

const COMMON_QUERYS: Query[] = [{ query: IS_LOGGED_IN }]
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const fetcher = async (context: GetServerSidePropsContext<ParsedUrlQuery>, querys: Query[]) => {
    IS_DEVELOPMENT && console.log('SSR START', context.req.url)
    const apolloClient = initializeApollo()
    for (const [index, { query, variables }] of COMMON_QUERYS.concat(querys).entries()) {
        try {
            console.log(variables)
            const { data } = await apolloClient.query({ query, variables, context: context.req, fetchPolicy: 'network-only' })
            IS_DEVELOPMENT && console.log('SSR DATA', index, data)
        } catch (error) {
            IS_DEVELOPMENT && console.error('SSR ERROR', error)
        }
    }
    return apolloClient.cache.extract()
}

export default fetcher