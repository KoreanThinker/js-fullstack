import { GetServerSideProps } from 'next'
import React from 'react'
import fetcher from '../../../lib/SSRQueryFetcher'

const modify = () => {
    return (
        <div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [])
    return { props: { initialApolloState } }
}


export default modify
