import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'

const Container = styled.div({
    flexGrow: 1,
    padding: 64
})

const signup = () => {
    return (
        <Layout>
            <Container>
                <h1>SignUp</h1>
            </Container>
        </Layout>
    )
}

export default signup