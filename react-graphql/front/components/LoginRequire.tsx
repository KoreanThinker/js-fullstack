import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useIsLoggedIn } from '../graphql/auth'

const LoginRequire: React.FC = ({ children }) => {

    const router = useRouter()
    const { data } = useIsLoggedIn()

    useEffect(() => {
        if (!data?.isLoggedIn) {
            alert('No Access')
            router.replace('/')
        }
    }, [!data?.isLoggedIn])


    if (!data?.isLoggedIn) return null
    return <>{children}</>
}

export default LoginRequire
