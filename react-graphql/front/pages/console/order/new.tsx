import { List } from 'antd'
import { GetServerSideProps } from 'next'
import React from 'react'
import ConsoleLayout from '../../../components/ConsoleLayout'
import NewOrderCard from '../../../components/NewOrderCard'
import { NEW_ORDER, useNewOrder } from '../../../graphql/order'
import fetcher from '../../../lib/SSRQueryFetcher'



const newOrder = () => {

    const { data } = useNewOrder()

    return (
        <ConsoleLayout>
            <List
                dataSource={data?.newOrder}
                renderItem={(item) => <NewOrderCard {...item} />}
            />
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [{ query: NEW_ORDER }])
    return { props: { initialApolloState } }
}


export default newOrder