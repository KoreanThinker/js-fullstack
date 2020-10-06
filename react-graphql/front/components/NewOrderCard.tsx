import { Button, Space, Avatar } from 'antd'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { NewOrder, useCancelOrder, useReceiveOrder } from '../graphql/order'

const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
    borderBottomColor: '#ddd',
    borderBottomWidth: 10
})



const NewOrderCard: React.FC<NewOrder> = ({ price, itemState, item, id }) => {

    const [cancelOrderRequest] = useCancelOrder()
    const [receiveOrderRequest] = useReceiveOrder()

    const onDeny = useCallback(async () => {
        try {
            await cancelOrderRequest({ variables: { orderId: id } })
        } catch (error) {
            toast.error(error)
        }
    }, [])

    const onAccept = useCallback(async () => {
        try {
            await receiveOrderRequest({ variables: { orderId: id } })
        } catch (error) {
            toast.error(error)
        }
    }, [])

    if (itemState !== 'receiving') return null

    return (
        <Container key={id} >
            <Link href={`/console/item/${id}`} ><a> <Avatar size={80} src={item.mainImage} /></a></Link>
            <Link href={`/console/item/${id}`} ><a>{item.name}</a></Link>
            <div>{price}$</div>
            <Space>
                <Button onClick={onDeny} >Deny</Button>
                <Button onClick={onAccept} type='primary'>Receive</Button>
            </Space>
        </Container>
    )

}

export default NewOrderCard