import { DocumentNode } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import { IS_LOGGED_IN } from "../graphql/auth"
import { initializeApollo } from "./apollo"

const COMMON_QUERYS = [IS_LOGGED_IN]
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const fetcher = async (context: GetServerSidePropsContext<ParsedUrlQuery>, querys: DocumentNode[]) => {
    IS_DEVELOPMENT && console.log('SSR START', context.req.url)
    const apolloClient = initializeApollo()
    for (const [index, query] of querys.concat(COMMON_QUERYS).entries()) {
        try {
            const { data } = await apolloClient.query({ query, context: context.req, fetchPolicy: 'network-only' })
            IS_DEVELOPMENT && console.log('SSR DATA', index, data)
        } catch (error) {
            IS_DEVELOPMENT && console.error('SSR ERROR', error)
        }
    }
    return apolloClient.cache.extract()
}

export default fetcher