import { GetServerSideProps } from 'next'
import React from 'react'
import ConsoleLayout from '../../../components/ConsoleLayout'
import { I_USER, useIUser } from '../../../graphql/user'
import fetcher from '../../../lib/SSRQueryFetcher'

const profile = () => {

    const { data: iUserData } = useIUser()

    return (
        <ConsoleLayout>
            <div>
                {iUserData?.iPartner.name}
                <br />
                {iUserData?.iPartner.email}
            </div>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [I_USER])
    return { props: { initialApolloState } }
}


export default profile
