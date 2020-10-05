import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'

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

export default showcase
