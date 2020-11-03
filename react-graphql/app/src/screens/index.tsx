import React, { useEffect, useRef } from 'react';
import { DefaultTheme, LinkingOptions, NavigationContainer, NavigationContainerRef, StackActions, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//@ts-ignore
import DeepLinking from 'react-native-deep-linking';

import HomeScreen from './HomeScreen'
import ChatScreen from './ChatScreen';
import ItemDetailScreen from './ItemDetail';
import LoginScreen from './LoginScreen';
import { Linking } from 'react-native';
import SearchScreen from './SearchScreen';
import SearchDetailScreen from './SearchDetailScreen';

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

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    }
}

const Navigation = () => {

    return (
        <NavigationContainer
            linking={linking}
            theme={theme}
        >
            <Stack.Navigator
                initialRouteName='Login'
                headerMode='none'
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Tab' component={TabNavigation} />
                <Stack.Screen name='ItemDetail' component={ItemDetailScreen} />
                <Stack.Screen name='Search' component={SearchScreen} />
                <Stack.Screen name='SearchDetail' component={SearchDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation