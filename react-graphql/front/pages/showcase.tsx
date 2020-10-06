import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import fetcher from '../lib/SSRQueryFetcher'

const Container = styled.div({
    padding: 64
})

const showcase = () => {
    return (
        <Layout>
            <Container>
                <h1>ShowCase</h1>
            </Container>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [])
    return { props: { initialApolloState } }
}


export default showcase
