import { Button, Input, InputNumber, Space } from 'antd'
import { Form } from 'antd'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import ConsoleLayout from '../../../components/ConsoleLayout'
import { ITEM, useItem, useUpdateItem } from '../../../graphql/item'
import fetcher from '../../../lib/SSRQueryFetcher'

const Container = styled.div({
    padding: 64
})

const FormContainer = styled(Space)({
    width: 360
})


const ItemDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const { data } = useItem({ variables: { itemId: Number(id) } })
    const [updateItemRequest, { loading, error }] = useUpdateItem()

    const [isModify, setIsModify] = useState(false)

    useEffect(() => {
        if (error && error.message) toast.error(error.message)
    }, [error])

    const onFinish = useCallback(async (values) => {
        if (!isModify) setIsModify(true)
        else {
            const { price, name } = values
            console.log(values)
            console.log(id, price, name)
            await updateItemRequest({ variables: { itemId: Number(id), price: Number(price), name } })
            router.back()
        }
    }, [isModify, id])

    const onFinishFailed = useCallback((errorInfo) => {
        console.log('Failed:', errorInfo);
    }, [])


    return (
        <ConsoleLayout>
            <Container>
                <Form
                    name='signup'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormContainer direction='vertical' >
                        <Form.Item
                            name='name'
                            rules={[
                                { required: isModify }
                            ]}
                        >
                            <Input disabled={!isModify} defaultValue={data?.item.name} placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name='price'
                            rules={[
                                {
                                    type: 'number',
                                    required: isModify
                                }
                            ]}
                        >
                            <InputNumber disabled={!isModify} defaultValue={data?.item.price} placeholder="Price" style={{ width: 200 }} />
                        </Form.Item>
                        <Form.Item >
                            <Button
                                loading={loading}
                                type={isModify ? 'primary' : 'default'}
                                htmlType='submit'
                            >
                                {isModify ? 'Confirm' : 'Modify'}
                            </Button>
                        </Form.Item>
                    </FormContainer>
                </Form>
            </Container>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [{ query: ITEM, variables: { itemId: Number(context.params?.id) } }])
    return { props: { initialApolloState } }
}


export default ItemDetail
