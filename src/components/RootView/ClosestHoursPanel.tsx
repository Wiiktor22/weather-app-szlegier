import React, { FC, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HourlyWeatherObject } from '../../network/stores/WeatherStore.types';

const items = [
    {
        hour: 'Teraz',
        temp: '8°C'
    },
    {
        hour: 12,
        temp: '8°C'
    },
    {
        hour: 13,
        temp: '8°C'
    },
    {
        hour: 14,
        temp: '8°C'
    },
    {
        hour: 15,
        temp: '8°C'
    },
    {
        hour: 16,
        temp: '8°C'
    },
    {
        hour: 17,
        temp: '8°C'
    }
]

interface Props {
    weather: HourlyWeatherObject[];
}

const ClosestHoursPanel: FC<Props> = ({ weather }) => {

    const getHour = (index: number) => {
        const now = new Date().getHours();
        const potentialNextHour = now + index;
        return potentialNextHour > 23 ? potentialNextHour - 24 : potentialNextHour
    }

    const data = useMemo(() => {
        let items: any = [];

        for (let i = 0; i < 7; i++) {
            const newItem = {
                hour: i === 0 ? 'Teraz' : `${getHour(i)}`,
                temp: `${Math.round(weather?.[i]?.temp)}°C`
            }
            items = [...items, newItem];
        }

        return items;
    }, [weather]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>Najbliższe godziny</Text>
                <View style={styles.divider} />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                >
                    {
                        data.map(item => (
                            <View style={styles.closestHour} key={item.hour}>
                                <Text style={styles.hourText}>{item.hour}</Text>
                                <Image source={require('../../../public/icons/03d.png')} style={styles.image} />
                                <Text style={styles.tempText}>{item.temp}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 160,
        marginTop: 10,
        backgroundColor: '#83BBF2',
        borderRadius: 12
    },
    contentContainer: {
        width: '90%',
        height: '85%'
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
        marginBottom: 15
    },
    closestHour: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 98,
        width: 42,
        marginRight: 15,
    },
    hourText: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        color: 'white'
    },
    tempText: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white'
    },
    image: {
        height: 25,
        width: 25
    }
});

export default ClosestHoursPanel;