import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'

const Container = styled.div({
  padding: 64
})

const Home = () => {
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
export default Home