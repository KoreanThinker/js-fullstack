import React from 'react'
import { StyleSheet, Text, View, PressableProps, Pressable } from 'react-native'

const BaseButton: React.FC<PressableProps> = (props) => {
    return (
        <Pressable
            android_ripple={{
                color: '#aaa',
            }}
            {...props}
        />
    )
}

export default BaseButton

const styles = StyleSheet.create({})
