import React, { useCallback } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Layout as AntdLayout, Menu, Space } from 'antd';
import { NAV_ROUTES } from '../constants/values';


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
    // const currentRoute = router.route.split('/')[1] || '/'

    const navigate = useCallback((route: string) => () => {
        router.push(route)
    }, [])

    const onSignup = useCallback(() => {
        router.push('/signup')
        // router.push('/logout')
    }, [])

    const onConsole = useCallback(() => {
        router.push('/login')
        // router.push('/console')
    }, [])


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
                    <Button type='text' onClick={onSignup} >SignUp</Button>
                    <Button type='primary' onClick={onConsole} >Login</Button>
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
