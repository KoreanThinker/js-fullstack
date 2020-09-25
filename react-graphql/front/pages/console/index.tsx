import { GetServerSideProps } from 'next'
import React from 'react'
import ConsoleLayout from '../../components/ConsoleLayout'
import { IS_LOGGED_IN } from '../../graphql/auth'
import { initializeApollo } from '../../lib/apollo'

const console = () => {
    return (
        <ConsoleLayout>
            <div>Console</div>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = initializeApollo()
    await apolloClient.query({ query: IS_LOGGED_IN, context: context.req, fetchPolicy: 'network-only' })

    return { props: { initialApolloState: apolloClient.cache.extract() } }
}

export default console
