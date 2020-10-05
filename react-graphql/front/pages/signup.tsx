import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, Space } from 'antd'
import Layout from '../components/Layout'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { IS_LOGGED_IN, useIsLoggedIn, useSignup } from '../graphql/auth';
import { initializeApollo } from '../lib/apollo';
import { GetServerSideProps } from 'next';


const Container = styled.div({
    padding: 64
})

const FormContainer = styled(Space)({
    width: 360
})

const signup = () => {
    const router = useRouter()
    const { data: isLoggedInData } = useIsLoggedIn()
    const [signupRequrest, { loading, data, error }] = useSignup()

    useEffect(() => { //when user already loggedin
        if (isLoggedInData?.isPartnerLoggedIn) router.replace('/')
    }, [isLoggedInData])

    useEffect(() => {
        if (data?.partnerSignup?.id) router.replace('/')
    }, [data])

    useEffect(() => {
        if (error && error.message) toast.error(error.message)
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = initializeApollo()
    await apolloClient.query({ query: IS_LOGGED_IN, context: context.req, fetchPolicy: 'network-only' })

    return { props: { initialApolloState: apolloClient.cache.extract() } }
}

export default signup