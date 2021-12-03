import React, { FC, useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import useUtils from '../../hooks/useUtils';
import { HourlyWeatherObject } from '../../network/stores/WeatherStore.types';

const items = [
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
    'image7',
]

interface Props {
    weather: HourlyWeatherObject[];
}

const ClosestDaysPanel: FC<Props> = ({ weather }) => {
    const { getNameOfTheDay } = useUtils();

    const today = useMemo(() => new Date().getDay(), [])

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>Prognoza (7 dni)</Text>
                <View style={styles.divider} />
                {
                    items.map((item, index) => (
                        <View style={styles.closestDayItem} key={item}>
                            <Text style={styles.dayText}>{index === 0 ? 'Dziś' : getNameOfTheDay(today + index)}</Text>
                            <View style={styles.detailsContainer}>
                                <Image source={require('../../../public/icons/03d.png')} style={styles.image} />
                                <Text style={styles.temperatureText}>{Math.round(weather?.[index]?.temp)}°C</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginVertical: 30,
        backgroundColor: '#83BBF2',
        borderRadius: 12
    },
    contentContainer: {
        width: '90%',
        marginVertical: 15
    },
    headerText: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        color: 'white'
    },
    divider: {
        width: '100%',
        borderWidth: 0.45,
        borderColor: 'white',
        borderRadius: 2,
        marginTop: 5,
        marginBottom: 10
    },
    closestDayItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginBottom: 6,
        paddingHorizontal: 4
    },
    dayText: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: 'white'
    },
    temperatureText: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: 100
    },
    image: {
        height: 25,
        width: 25
    }
})

export default ClosestDaysPanel;