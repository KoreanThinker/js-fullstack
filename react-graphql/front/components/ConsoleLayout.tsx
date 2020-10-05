import React, { useCallback } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Layout as AntdLayout, Menu, Space } from 'antd';
import { toast } from 'react-toastify';
import { useLogout } from '../graphql/auth';
import { UserOutlined, MessageOutlined, BarcodeOutlined, BarsOutlined } from '@ant-design/icons';
import LoginRequire from './LoginRequire';

const { SubMenu } = Menu

const MENUS = [
    {
        title: 'Profile',
        icon: <UserOutlined />,
        subMenu: [
            { title: 'My Profile', route: '/console/profile' }
        ]
    },
    {
        title: 'Item',
        icon: <BarsOutlined />,
        subMenu: [
            { title: 'My Item', route: '/console/item' },
            { title: 'Add Item', route: '/console/item/add' }
        ]
    },
    {
        title: 'Order',
        icon: <BarcodeOutlined />,
        subMenu: [
            { title: 'My Order', route: '/console/order' },
            { title: 'New Order', route: '/console/order/new' }
        ]
    },
    {
        title: 'Chat',
        icon: <MessageOutlined />,
        subMenu: [
            { title: 'My Chat', route: '/console/chat' },
            { title: 'New Chat', route: '/console/chat/new' }
        ]
    }
]

const Layout = styled(AntdLayout)({
    minHeight: '100vh',
    minWidth: '100vw'
})

const Header = styled(AntdLayout.Header)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00152A',
    boxShadow: '0 2px 8px #f0f1f2',
    zIndex: 10
})

const InnerLayout = styled(AntdLayout)({
    flexGrow: 1
})

const Sider = styled(AntdLayout.Sider)({

})

const Content = styled(AntdLayout.Content)({
    backgroundColor: '#fff',
    padding: 0,
    display: 'flex'
})

const ChildrenContainer = styled.div({
})

const Footer = styled(AntdLayout.Footer)({
    textAlign: 'center',
    backgroundColor: '#fff'
})

const Icon = styled.img({
    width: 48,
    height: 48,
    marginRight: 24
})

const ConsoleLayout: React.FC = ({ children }) => {
    const router = useRouter()
    const [logoutRequest] = useLogout()

    const navigate = useCallback((route: string) => () => {
        router.push(route)
    }, [])

    const onLogout = useCallback(async () => {
        try {
            await logoutRequest()
        } catch (error) {
            toast.error('Logout Error')
        }
        router.replace('/')
    }, [])

    return (
        <LoginRequire>
            <Layout>
                <Header >
                    <Space>
                        <Link href='/'><a><Icon src='/icon.png' /></a></Link>
                        <Link href='/console'><a><div style={{ color: '#fff', fontSize: 24 }} >Console</div></a></Link>
                        {/* <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                    </Menu> */}
                    </Space>
                    <Space>
                        <Button type='primary' onClick={onLogout} >Logout</Button>
                    </Space>
                </Header >
                <Content>
                    <InnerLayout>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                {MENUS.map((menu) =>
                                    <SubMenu key={menu.title} icon={menu.icon} title={menu.title}>
                                        {menu.subMenu.map((subMenu) =>
                                            <Menu.Item key={subMenu.title} onClick={navigate(subMenu.route)}>{subMenu.title}</Menu.Item>
                                        )}
                                    </SubMenu>
                                )}
                            </Menu>
                        </Sider>
                        <Content>
                            <AntdLayout>
                                <Content>
                                    <ChildrenContainer>
                                        {children}
                                    </ChildrenContainer>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Korean Thinker ©2020 Created by React GraphQL Apollo Antd</Footer>
                            </AntdLayout>
                        </Content>
                    </InnerLayout>
                </Content>
            </Layout>
        </LoginRequire>
    )
}



export default ConsoleLayout
