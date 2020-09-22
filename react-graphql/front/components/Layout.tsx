import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Layout as AntdLayout, Menu, Space } from 'antd';
import { NAV_ROUTES } from '../constants/values';
import { gql, useQuery } from '@apollo/client';
import { IUser } from '../constants/types';
import client from '../apollo/client';
import { toast } from 'react-toastify';

const GET_I_USER = gql`
  query getIUser {
    iUser {
      email
      name
      id
    }
  }
`

const MyLayout = styled(AntdLayout)({
    minHeight: '100vh',
    minWidth: '100vw'
})

const Header = styled(AntdLayout.Header)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px #f0f1f2',
    zIndex: 10
})

const Content = styled(AntdLayout.Content)({
    backgroundColor: '#fff',
    padding: 0,
})

const Footer = styled(AntdLayout.Footer)({
    textAlign: 'center'
})

const Icon = styled.img({
    width: 48,
    height: 48,
    marginRight: 24
})

const Layout: React.FC = ({ children }) => {

    const router = useRouter()
    const { data } = useQuery(GET_I_USER, { client })
    const [iUser, setIUser] = useState<IUser | null>(null)
    // const currentRoute = router.route.split('/')[1] || '/'

    useEffect(() => {
        console.log(data)
        if (data) {
            setIUser(data.iUser as IUser)
        }
    }, [data])

    const navigate = useCallback((route: string) => () => {
        router.push(route)
    }, [])

    const onSignup = useCallback(() => {
        if (iUser) {
            //logout
            localStorage.removeItem('token')
            client.clearStore()
                .then(() => setIUser(null))
                .catch(() => toast.error('Try again'))
        } else {
            router.push('/signup')
        }
    }, [iUser])

    const onConsole = useCallback(() => {
        if (iUser) {
            router.push('/console')
        } else {
            router.push('/login')
        }
    }, [iUser])


    return (
        <MyLayout>
            <Header>
                <Space>
                    <Link href='/'><a><Icon src='/icon.png' /></a></Link>
                    <Menu mode="horizontal">
                        {NAV_ROUTES.map((route) =>
                            <Menu.Item
                                key={route}
                                onClick={navigate(route)}
                            >
                                {route}
                            </Menu.Item>
                        )}
                    </Menu>
                </Space>
                <Space>
                    <Button type='text' onClick={onSignup} >{iUser ? 'Logout' : 'SignUp'}</Button>
                    <Button type='primary' onClick={onConsole} >{iUser ? 'Console' : 'Login'}</Button>
                </Space>
            </Header >
            <Content>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Korean Thinker ©2020 Created by React GraphQL Apollo Antd</Footer>
        </MyLayout>
    )
}

export default Layout
