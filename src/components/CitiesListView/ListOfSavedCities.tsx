import React, { FC, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {

}

const ListOfSavedCities: FC<Props> = ({ }) => {

    const cities = useMemo(() => {
        const currentLocation = {
            name: 'Moja lokalizacja',
            temp: 4
        }
        return [currentLocation, ...testLocation]
    }, []);

    return (
        <ScrollView style={styles.scrollContainer}>
            {
                cities.map(({ name, temp }, index) => (
                    <TouchableOpacity 
                        key={`${name}-${index}`}
                        style={styles.cityItem}
                    >
                        <Text style={styles.cityNameText}>{name}</Text>
                        <Text style={styles.tempText}>{temp} °C</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30,
    },
    cityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4ea2f5',
        height: 60,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10
    },
    cityNameText: {
        fontFamily: 'Montserrat_300Light',
        fontSize: 18,
        color: 'white'
    },
    tempText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 22,
        color: 'white'
    }
})

export default ListOfSavedCities;

const testLocation = [
    {
        name: 'Testowa lokalizacja 1',
        temp: 5
    },
    {
        name: 'Testowa lokalizacja 2',
        temp: 6
    },
    {
        name: 'Testowa lokalizacja 3',
        temp: 17
    },
]