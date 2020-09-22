import { gql, useMutation } from '@apollo/client'
import { Button, Form, Input, Space } from 'antd'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Layout from '../components/Layout'

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }
`

const Container = styled.div({
    padding: 64
})

const FormContainer = styled(Space)({
    width: 360
})


const login = () => {

    const router = useRouter()
    const [loginRequest, { loading, data, error }] = useMutation(LOGIN)

    useEffect(() => { //when user has token replace to home
        if (localStorage.getItem('token')) router.replace('/')
    }, [])

    useEffect(() => {
        if (data && data.login && data.login.token) {
            console.log(data.login.token)
            localStorage.setItem('token', data.login.token)
            router.replace('/')
        }
    }, [data])

    useEffect(() => {
        if (error && error.message) toast.error(error.message)
    }, [error])

    const onFinish = useCallback((values) => {
        const { password, email } = values
        loginRequest({ variables: { email, password } })
    }, [])

    const onFinishFailed = useCallback((errorInfo) => {
        console.log('Failed:', errorInfo);
    }, [])

    return (
        <Layout>
            <Container>
                <Form
                    name='signup'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormContainer direction='vertical' >
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    type: 'email',
                                    message: 'please write current email',
                                },
                                { required: true }
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[
                                { required: true }
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item >
                            <Button loading={loading} type="primary" htmlType="submit">Confirm</Button>
                        </Form.Item>
                    </FormContainer>
                </Form>
            </Container>
        </Layout>
    )
}

export default login