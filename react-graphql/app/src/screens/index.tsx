import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen'
import ChatScreen from './ChatScreen';
import PostDetailScreen from './PostDetailScreen';
import LoginScreen from './LoginScreen';

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
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Tab' component={TabNavigation} />
                <Stack.Screen name='PostDetail' component={PostDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation