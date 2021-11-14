import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {

}

const TodayWeatherPanel: FC<Props> = ({}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.regularText}>Pogoda</Text>
            <Text style={styles.cityText}>Miasto, PA</Text>
            <Text style={styles.regularText}>Krótki opis</Text>
            <Text style={styles.tempeatureText}>0°C</Text>
            <View style={styles.minMaxContainer}>
                <Text style={{ ...styles.regularText, marginRight: 15}}>
                    Min: <Text style={styles.minMaxValueText}>0°C</Text>
                </Text>
                <Text style={styles.regularText}>
                    Max: <Text style={styles.minMaxValueText}>0°C</Text>
                </Text>
            </View>
            <Text>Image</Text>
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
        height: 325,
        borderWidth: 2,
        borderColor: 'red'
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