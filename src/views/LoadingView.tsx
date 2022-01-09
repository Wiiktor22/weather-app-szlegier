import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScreensNames } from '../nav/RootNavigation';
import useFetch from '../network/useFetch';
import * as Location from 'expo-location';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import useWeatherStore from '../network/stores/WeatherStore';

const LoadingView: FC = () => {
    const navigation = useNavigation();
    const { fetchWeatherByCoords } = useFetch();
    const { getItem } = useAsyncStorage('persistSavedLocations');
    const [savedLocation] = useWeatherStore('savedLocation');

    const [screenMessage, setScreenMessage] = useState('Pobieranie obecnej lokalizacji...');
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setScreenMessage('Dla prawidłowego działania aplikacji proszę umożliwić dostęp do lokalizacji!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: 1
            });
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        if (location === null) return;

        setScreenMessage('Wczytywanie pogody...')

        const fetchWeatherForAllLocations = async () => {
            const { coords: { latitude, longitude } } = location;
            let persistSavedLocations: any = await getItem();
            if (typeof persistSavedLocations === 'string') persistSavedLocations = JSON.parse(persistSavedLocations);

            persistSavedLocations = [
                { latitude, longitude },
                ...(persistSavedLocations !== null ? persistSavedLocations : [])
            ];
            
            for (const persistLocation of persistSavedLocations) {
                const { latitude, longitude } = persistLocation;
                await fetchWeatherByCoords(latitude, longitude);
            }

            navigation.navigate(ScreensNames.Root, { weather: savedLocation[0] });
        }

        fetchWeatherForAllLocations();
    }, [location]);

    

    return (
        <View style={styles.container}>
            <Text style={styles.regularText}>{screenMessage}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flex: 1,
        backgroundColor: '#4ea2f5',
    },
    regularText: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: 'white'
    },
})

export default LoadingView;
