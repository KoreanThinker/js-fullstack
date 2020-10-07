import { useApolloClient } from '@apollo/client'
import { Avatar, Button, Space } from 'antd'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Item } from '../constants/types'
import { useDeleteItem } from '../graphql/item'


const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
    borderBottomColor: '#ddd',
    borderBottomWidth: 10
})


const ItemCard: React.FC<Item> = ({ id, mainImage, name, price, published }) => {

    const router = useRouter()
    const [deleteItemRequest] = useDeleteItem()

    const onDelete = useCallback(async () => {
        try {
            await deleteItemRequest({ variables: { itemId: id } })
            // client.cache.modify({
            //     id: client.cache.identify({ __ref: `Item:${id}` }),
            //     fields: (_, { DELETE }) => DELETE
            // })
        } catch (error) {
            toast.error(error)
        }
    }, [id])

    const onDetail = useCallback(async () => {
        try {
            router.push(`/console/item/${id}`)
        } catch (error) {
            toast.error(error)
        }
    }, [])

    return (
        <Container key={id} >
            <Avatar size={80} src={mainImage} />
            <p>{name}</p>
            <div>{price}$</div>
            <div>{published ? 'publishing' : 'closed'}</div>
            <Space>
                <Button onClick={onDelete} >Delete</Button>
                <Button onClick={onDetail} type='primary'>Detail</Button>
            </Space>
        </Container>
    )

}

export default ItemCard
