import React, { FC, useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { ScreensNames } from '../../nav/RootNavigation';
import { CurrentWeatherDetails } from '../../network/stores/WeatherStore.types';
import useUtils from '../../hooks/useUtils';

interface Props {
    weather: CurrentWeatherDetails;
}

const TodayWeatherPanel: FC<Props> = ({ weather }) => {
    const navigation = useNavigation();
    const { getPhoto } = useUtils();

    const getLastUpdate = () => {
        const now = new Date()
        const hours = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`
        const minutes = now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`
        return `${hours}:${minutes}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.regularText}>Pogoda</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate({ name: ScreensNames.CitiesList })}
                >
                    <Ionicons name="menu-outline" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.cityText}>{weather?.name}</Text>
            <Text style={styles.regularText}>{weather?.description}</Text>
            <Text style={styles.tempeatureText}>{Math.round(weather?.temp)}°C</Text>
            <View style={styles.minMaxContainer}>
                <Text style={{ ...styles.regularText, marginRight: 15}}>
                    Min: <Text style={styles.minMaxValueText}>{Math.round(weather?.minTemp)}°C</Text>
                </Text>
                <Text style={styles.regularText}>
                    Max: <Text style={styles.minMaxValueText}>{Math.round(weather?.maxTemp)}°C</Text>
                </Text>
            </View>
            {
                typeof weather?.iconID === 'string' ? (
                    <Image source={getPhoto(weather?.iconID)} />
                ) : null
            }
            <Text style={styles.lastUpdateText}>Ostatnia aktualizacja: {getLastUpdate()}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        height: 320,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        width: '100%',
        paddingHorizontal: 15
    },
    regularText: {
        fontSize: 16,
        fontFamily: 'Montserrat_300Light',
        color: 'white'
    },
    cityText: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white'
    },
    tempeatureText: {
        fontSize: 40,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white'
    },
    minMaxContainer: {
        flexDirection: 'row'
    },
    minMaxValueText: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white'
    },
    lastUpdateText: {
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
        color: 'white'
    }
})

export default TodayWeatherPanel;