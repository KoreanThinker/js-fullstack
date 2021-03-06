import { GetServerSideProps } from 'next'
import React from 'react'
import ConsoleLayout from '../../components/ConsoleLayout'
import fetcher from '../../lib/SSRQueryFetcher'

const console = () => {
    return (
        <ConsoleLayout>
            <div>Console</div>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [])
    return { props: { initialApolloState } }
}



export default console
