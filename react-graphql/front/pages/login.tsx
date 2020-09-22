import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'

const Container = styled.div({
    padding: 64
})


const login = () => {
    return (
        <Layout>
            <Container>
                <h1>login</h1>
            </Container>
        </Layout>
    )
}

export default login