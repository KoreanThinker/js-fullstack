import AsyncStorage from "@react-native-community/async-storage"

const asyncStroageParser = async  <T>(key: string, defaultValue: T): Promise<T> => {
    const result = await AsyncStorage.getItem(key)
    return result ? JSON.parse(result) : defaultValue
}

export default asyncStroageParser