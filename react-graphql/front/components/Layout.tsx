import React, { useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NAV_ROUTES } from '../constants/values'

const NavBar = styled.div({
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    boxShadow: '0 2px 6px 0 rgba(0,0,0,.12), inset 0 -1px 0 0 #dadce0'
})

const Icon = styled.img({
    width: 56,
    height: 56
})

const NavItem = styled.span<{ isCurrentRoute: boolean }>(({ isCurrentRoute }) => ({
    color: isCurrentRoute ? '#3f20cc' : '#000',
    marginLeft: 20,
    fontSize: 20
}))

const Left = styled.div({
    flexDirection: 'row',
    alignItems: 'center'
})

const Right = styled.div({
    flexDirection: 'row',
    alignItems: 'center'
})

const SignUp = styled.span({
    marginRight: 20,
    color: '#000'
})

const ConsoleBox = styled.div({
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f20cc',
    padding: 16,
    ":hover": {
        backgroundColor: '#3f20ba'
    }
})

const Console = styled.span({
    color: '#fff'
})

const Footer = styled.div({
    backgroundColor: '#ddd',
    height: 100
})

const MainLayout: React.FC = ({ children }) => {

    const router = useRouter()
    const currentRoute = router.route.split('/')[1] || '/'

    useEffect(() => {
        console.log(currentRoute)
    }, [currentRoute])

    return (
        <div >
            <NavBar>
                <Left>
                    <Link href='/'>
                        <a>
                            <Icon src='/favicon.ico' alt='logo' />
                        </a>
                    </Link>
                    {NAV_ROUTES.map(v =>
                        <Link href={`/${v}`}>
                            <a><NavItem isCurrentRoute={currentRoute === v} >{v}</NavItem></a>
                        </Link>
                    )}

                </Left>
                <Right>
                    <Link href='/signup' >
                        <a><SignUp>Signup</SignUp></a>
                    </Link>
                    <a href='https://www.github.com/KoreanThinker' target='_blank'>
                        <ConsoleBox>
                            <Console>Console</Console>
                        </ConsoleBox>
                    </a>
                </Right>
            </NavBar>
            {children}
            <Footer>

            </Footer>
        </div>
    )
}

export default MainLayout
