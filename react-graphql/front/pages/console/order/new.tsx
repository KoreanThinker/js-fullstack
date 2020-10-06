import { GetServerSideProps } from 'next'
import React from 'react'
import ConsoleLayout from '../../../components/ConsoleLayout'
import fetcher from '../../../lib/SSRQueryFetcher'

const newOrder = () => {
    return (
        <ConsoleLayout>
            <div>new Order</div>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [])
    return { props: { initialApolloState } }
}


export default newOrder