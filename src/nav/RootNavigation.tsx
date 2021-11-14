import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import RootView from '../views/RootView';

export enum ScreensNames {
    Root = 'ROOT_SCREEN'
}

const Stack = createStackNavigator();

const options: StackNavigationOptions = {
    gestureEnabled: false,
    headerShown: false
}

const RootNavigation = () => (
    <Stack.Navigator
        initialRouteName={ScreensNames.Root}
        screenOptions={options}
    >
        <Stack.Screen name={ScreensNames.Root} component={RootView} />
    </Stack.Navigator>
)

export default RootNavigation;