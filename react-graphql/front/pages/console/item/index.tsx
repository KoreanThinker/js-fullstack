import { List } from 'antd'
import { GetServerSideProps } from 'next'
import React from 'react'
import ConsoleLayout from '../../../components/ConsoleLayout'
import ItemCard from '../../../components/ItemCard'
import { MY_ITEM, useMyItems } from '../../../graphql/item'
import fetcher from '../../../lib/SSRQueryFetcher'



const item = () => {

    const { data } = useMyItems()

    return (
        <ConsoleLayout>
            <List
                dataSource={data?.myItems}
                renderItem={(item) => <ItemCard {...item} />}
            />
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [{ query: MY_ITEM }])
    return { props: { initialApolloState } }
}


export default item