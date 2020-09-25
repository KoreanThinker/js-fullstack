import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import React from 'react'
import ConsoleLayout from '../../../components/ConsoleLayout'
import { IS_LOGGED_IN } from '../../../graphql/auth'
import { I_USER, useIUser } from '../../../graphql/user'
import { initializeApollo } from '../../../lib/apollo'
import combineQuery from 'graphql-combine-query'

const profile = () => {

    const { data: iUserData } = useIUser()

    return (
        <ConsoleLayout>
            <div>
                {iUserData?.iUser.name}
                <br />
                {iUserData?.iUser.email}
            </div>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = initializeApollo()
    const { document } = combineQuery('Query')
        .add(IS_LOGGED_IN)
        .add(I_USER)
    console.log(document)
    const { data } = await apolloClient.query({ query: document, context: context.req, fetchPolicy: 'network-only' })
    console.log(data)
    return { props: { initialApolloState: apolloClient.cache.extract() } }
}

export default profile
