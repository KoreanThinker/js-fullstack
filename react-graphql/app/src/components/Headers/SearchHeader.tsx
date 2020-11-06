import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseButton from '../BaseButton'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, GRAY } from '../../constants/styles'
import { useNavigation } from '@react-navigation/native'
import useSearchKeyword from '../../hooks/useSearchKeyword'
import useRecentSearchKeywords from '../../hooks/useRecentSearchKeywords'

interface SearchHeaderProps {
    editable?: boolean
}


const SearchHeader: React.FC<SearchHeaderProps> = ({ editable }) => {

    const { navigate, goBack } = useNavigation()
    const { searchKeyword, onChange, onClear } = useSearchKeyword()
    const { addRecentSearchKeywords } = useRecentSearchKeywords()

    const onSearch = useCallback(() => {
        if (!editable) return
        navigate('SearchDetail', { searchKeyword })
        addRecentSearchKeywords(searchKeyword)
    }, [searchKeyword])

    const onClearBtn = useCallback(() => {
        onClear()
        if (!editable) goBack()
    }, [editable])

    return (
        <View style={styles.container} >
            <BaseButton
                onPress={goBack}
                style={styles.backContainer}
            >
                <Icon name='arrow-left' size={24} color={COLOR1} />
            </BaseButton>
            <View
                style={styles.inputContainer}
            >
                <Icon2 name='search' size={16} color='#00000076' />
                {editable ?
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        maxLength={100}
                        onSubmitEditing={onSearch}
                        value={searchKeyword}
                        onChangeText={onChange}
                        autoFocus={editable}
                    />
                    :
                    <Pressable
                        onPress={goBack}
                        style={styles.keywordContainer}
                    >
                        <Text numberOfLines={1}>{searchKeyword}</Text>
                    </Pressable>
                }
                <Pressable
                    onPress={onClearBtn}
                    style={styles.inputClearBtn}
                >
                    <Icon2 name='clear' size={12} color={GRAY} />
                </Pressable>
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
        paddingHorizontal: 10,
        color: '#000',
        paddingVertical: 0
    },
    keywordContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        height: '100%'
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