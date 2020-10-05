import { Button, Form, Input, Space } from 'antd'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { useIsLoggedIn, useLogin } from '../graphql/auth'



const Container = styled.div({
    padding: 64
})

const FormContainer = styled(Space)({
    width: 360
})


const login = () => {

    const router = useRouter()
    const { data: isLoggedInData } = useIsLoggedIn()
    const [loginRequest, { loading, data, error }] = useLogin()

    useEffect(() => { //when user already loggedin
        if (isLoggedInData?.isPartnerLoggedIn) router.replace('/')
    }, [isLoggedInData])

    useEffect(() => { // success login
        if (data?.partnerLogin?.id) router.replace('/')
    }, [data])

    useEffect(() => { //fail login
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