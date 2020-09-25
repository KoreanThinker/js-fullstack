import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ConsoleLayout from '../../components/ConsoleLayout'
import { IS_LOGGED_IN, useIsLoggedIn } from '../../graphql/auth'
import { initializeApollo } from '../../lib/apollo'

const console = () => {

    const router = useRouter()
    const { data } = useIsLoggedIn()

    useEffect(() => {
        if (!data?.isLoggedIn) {
            alert('No Access') // layout?
            router.back()
        }
    }, [data?.isLoggedIn])


    if (!data?.isLoggedIn) return null

    return (
        <ConsoleLayout>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = initializeApollo()
    await apolloClient.query({ query: IS_LOGGED_IN, context: context.req, fetchPolicy: 'network-only' })

    return { props: { initialApolloState: apolloClient.cache.extract() } }
}

export default console
