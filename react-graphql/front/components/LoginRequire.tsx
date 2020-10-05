import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useIsLoggedIn } from '../graphql/auth'

const LoginRequire: React.FC = ({ children }) => {

    const router = useRouter()
    const { data } = useIsLoggedIn()

    useEffect(() => {
        if (!data?.isPartnerLoggedIn) {
            alert('No Access')
            router.replace('/')
        }
    }, [!data?.isPartnerLoggedIn])


    if (!data?.isPartnerLoggedIn) return null
    return <>{children}</>
}

export default LoginRequire
