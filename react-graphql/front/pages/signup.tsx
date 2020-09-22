import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, Space } from 'antd'
import Layout from '../components/Layout'
import { toast } from 'react-toastify';

const Container = styled.div({
    padding: 64
})

const FormContainer = styled(Space)({
    width: 360
})

const signup = () => {

    const onFinish = useCallback((values) => {
        const { password, passwordCheck } = values
        if (password !== passwordCheck) {
            toast.error("Password and password check is not equal")
        }
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
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </FormContainer>
                </Form>
            </Container>
        </Layout>
    )
}

export default signup