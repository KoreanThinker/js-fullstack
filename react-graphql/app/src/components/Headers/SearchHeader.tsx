import React, { useCallback, useRef } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseButton from '../BaseButton'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, GRAY } from '../../constants/styles'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import useInput from '../../hooks/useInput'

interface SearchHeaderProps {
    editable?: boolean
}

interface Route {
    params?: {
        keyword?: string,
        onClear?: () => void,
        onFocus?: () => void
    }
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ editable }) => {

    const { dispatch, navigate, goBack, } = useNavigation()
    const { params }: Route = useRoute()
    const { value, onChange, onClear } = useInput(params?.keyword || '')
    const input = useRef<TextInput>(null)

    const onBack = useCallback(() => {
        if (editable) goBack()
        else {
            (StackActions.push('Tab'))
        }
    }, [editable, goBack])

    const onSearch = useCallback(() => {
        if (!editable) return
        navigate('SearchDetail', {
            keyword: value,
            onClear: () => onClear(),
            onFocus: () => input.current?.focus()
        })
    }, [value, input, onClear])

    const onTextInput = useCallback(() => {
        if (!editable) {
            goBack()
            params?.onFocus && params.onFocus()
        }
    }, [editable, params])

    const onClearBtn = useCallback(() => {
        if (editable) onClear()
        else {
            params?.onClear && params.onClear()
            goBack()
            params?.onFocus && params.onFocus()
        }
    }, [onClear, editable, params])

    return (
        <View style={styles.container} >
            <BaseButton
                onPress={onBack}
                style={styles.backContainer}
            >
                <Icon name='arrow-left' size={24} color={COLOR1} />
            </BaseButton>
            <View
                style={styles.inputContainer}
            >
                <Icon2 name='search' size={16} color='#00000076' />
                <TextInput
                    editable={editable}
                    style={styles.input}
                    maxLength={100}
                    onSubmitEditing={onSearch}
                    value={value}
                    onChangeText={onChange}
                    onTouchEnd={onTextInput}
                    ref={input}
                />
                <BaseButton
                    onPress={onClearBtn}
                    style={styles.inputClearBtn}
                >
                    <Icon2 name='clear' size={12} color={GRAY} />
                </BaseButton>
            </View>
        </View>
    )
}

SearchHeader.defaultProps = {
    editable: true
}

export default SearchHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16
    },
    backContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 1,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: COLOR1 + '76',
        borderRadius: 16
    },
    input: {
        flex: 1,
        paddingHorizontal: 10
    },
    inputClearBtn: {
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})