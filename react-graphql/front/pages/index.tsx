import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'
import { initializeApollo } from '../lib/apollo'
import Layout from '../components/Layout'
import { IS_LOGGED_IN } from '../graphql/auth'


const Container = styled.div({
  padding: 64
})

const home = () => {
  return (
    <Layout>
      <Container >
        <h1>
          React<br />
          GraphQL<br />
          FullStack<br />
          Admin Page
        </h1>
      </Container>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo()
  await apolloClient.query({ query: IS_LOGGED_IN, context: context.req, fetchPolicy: 'network-only' })

  return { props: { initialApolloState: apolloClient.cache.extract() } }
}

export default home