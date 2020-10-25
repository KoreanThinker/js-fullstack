import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import useAuth from '../hooks/useAuth'
import BaseText from '../components/BaseText'
import { useRoute } from '@react-navigation/native'


const LoginScreen = () => {

    const { params }: any = useRoute()

    const { kakaoLogin, facebookLogin, checkIsLoggedIn } = useAuth()

    useEffect(() => {
        checkIsLoggedIn(params?.id)
    }, [])

    return (
        <View style={styles.container} >
            <BaseButton onPress={kakaoLogin} style={styles.snsBtn} >
                <BaseText>Kakao</BaseText>
            </BaseButton>
            <BaseButton onPress={facebookLogin} style={styles.snsBtn} >
                <BaseText >Facebook</BaseText>
            </BaseButton>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    snsBtn: {
        width: 320,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        overflow: 'hidden'
    }
})