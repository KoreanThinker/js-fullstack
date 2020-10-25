import React, { useEffect, useRef } from 'react';
import { LinkingOptions, NavigationContainer, NavigationContainerRef, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//@ts-ignore
import DeepLinking from 'react-native-deep-linking';

import HomeScreen from './HomeScreen'
import ChatScreen from './ChatScreen';
import ItemDetailScreen from './ItemDetail';
import LoginScreen from './LoginScreen';
import { Linking } from 'react-native';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
        >
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Chat' component={ChatScreen} />
        </Tab.Navigator>
    )
}

const linking: LinkingOptions = {
    prefixes: ['reactgraphql://'],
    config: {
        screens: {
            Login: {
                path: 'item/:id',
                parse: { id: (id) => id },
            }
        }
    }
}

const Navigation = () => {

    return (
        <NavigationContainer
            linking={linking}
        >
            <Stack.Navigator
                initialRouteName='Login'
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Tab' component={TabNavigation} />
                <Stack.Screen name='ItemDetail' component={ItemDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation