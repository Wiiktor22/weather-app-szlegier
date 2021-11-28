import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import RootView from '../views/RootView';
import CitiesListView from '../views/CitiesListView';

export enum ScreensNames {
    Root = 'ROOT_SCREEN',
    CitiesList = 'CITIES_LIST_SCREEN'
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
        {/* <Stack.Screen name={ScreensNames.Root} component={RootView} /> */}
        <Stack.Screen name={ScreensNames.CitiesList} component={CitiesListView} />
    </Stack.Navigator>
)

export default RootNavigation;