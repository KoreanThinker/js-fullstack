import React from 'react'
import { StyleSheet, Text, TextProps, View } from 'react-native'

const BaseText: React.FC<TextProps> = (props) => <Text style={styles.baseStyle} {...props} />

export default BaseText

const styles = StyleSheet.create({
    baseStyle: {
        color: 'red'
    }
})
export const baseTextStyle = styles.baseStyle