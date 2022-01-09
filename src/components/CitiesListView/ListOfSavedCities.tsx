import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScreensNames } from '../../nav/RootNavigation';
import useWeatherStore from '../../network/stores/WeatherStore';

const ListOfSavedCities: FC = () => {
    const navigation = useNavigation();
    const [savedLocation, setSavedLocation] = useWeatherStore('savedLocation');
    const { getItem, setItem } = useAsyncStorage('persistSavedLocations'); 

    const cities = savedLocation.map((location, index) => ({
        name: index === 0 ? 'Moja lokalizacja' : location.current.name,
        temp: Math.round(location.current.temp)
    }));

    const onSpecificLocationPress = (index: number) => {
        const location = savedLocation[index];
        navigation.navigate(ScreensNames.Root, { weather: location });
    }

    const onSpecificLocationLongPress = async (index: number) => {
        const locationName = savedLocation[index].current.name;

        // TODO: NAPRAWIĆ KASOWANIE
        
        const savedLocations = await getItem() as string;
        const parsedLocation = JSON.parse(savedLocations);
        const newPersistSavedLocation = parsedLocation.filter(l => l.name !== locationName);
        setItem(JSON.stringify(newPersistSavedLocation));

        const newSavedLocation = savedLocation.filter(l => l.current.name !== locationName);
        setSavedLocation(newSavedLocation);
    }

    return (
        <ScrollView style={styles.scrollContainer}>
            {
                cities.map(({ name, temp }, index) => (
                    <TouchableOpacity 
                        key={`${name}-${index}`}
                        style={styles.cityItem}
                        onPress={() => onSpecificLocationPress(index)}
                        onLongPress={() => onSpecificLocationLongPress(index)}
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