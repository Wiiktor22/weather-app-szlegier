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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.regularText}>Pogoda</Text>
                <TouchableOpacity 
                    style={styles.menuButton}
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
            <Text style={styles.lastUpdateText}>Ostatnia aktualizacja: 00:00</Text>
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
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: '100%',
    },
    menuButton: {
        position: 'absolute',
        right: 10
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