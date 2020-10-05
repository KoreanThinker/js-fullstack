import React from 'react'
import ConsoleLayout from '../../../components/ConsoleLayout'
import { I_USER, useIUser } from '../../../graphql/user'

const profile = () => {

    const { data: iUserData } = useIUser()

    return (
        <ConsoleLayout>
            <div>
                {iUserData?.iPartner.name}
                <br />
                {iUserData?.iPartner.email}
            </div>
        </ConsoleLayout>
    )
}

export const QUERYS = [I_USER]

export default profile
