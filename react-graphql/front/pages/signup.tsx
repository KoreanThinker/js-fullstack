import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, Space } from 'antd'
import Layout from '../components/Layout'
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const SIGHUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
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

const signup = () => {

    const router = useRouter()
    const [signupRequrest, { loading, data, error }] = useMutation(SIGHUP)

    useEffect(() => {
        if (data && data.signup && data.signup.token) {
            console.log(data.signup.token)
            localStorage.setItem('token', data.signup.token)
            router.replace('/')
        }
    }, [data])

    useEffect(() => {
        if (error) toast.error(error.message)
    }, [error])

    const onFinish = useCallback((values) => {
        const { password, passwordCheck, email, name } = values
        if (password !== passwordCheck) {
            toast.error("Password and password check is not equal")
        }
        signupRequrest({ variables: { email, password, name } })
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
                                { min: 6 },
                                { max: 13 },
                                { required: true }
                            ]}
                        >
                            <Input.Password placeholder="Password (6 ~ 13)" />
                        </Form.Item>
                        <Form.Item
                            name='passwordCheck'
                            rules={[
                                { min: 6 },
                                { max: 13 },
                                { required: true }
                            ]}
                        >
                            <Input.Password placeholder="Password check" />
                        </Form.Item>
                        <Form.Item
                            name='name'
                            rules={[
                                { required: true },
                                { min: 2 },
                                { max: 13 }
                            ]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item >
                            <Button loading={loading} type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </FormContainer>
                </Form>
            </Container>
        </Layout>
    )
}

export default signup