import React, { FC, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ListOfSavedCities from '../components/CitiesListView/ListOfSavedCities';
import { Feather } from '@expo/vector-icons';

const CitiesListView: FC = () => {
    const [searchedCityName, setSearchedCityName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.cityText}>Pogoda</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    value={searchedCityName}
                    onChangeText={text => setSearchedCityName(text)}
                    placeholder={'Szukaj miasta'}
                    placeholderTextColor={'#b3b3b3'}
                />
                <TouchableOpacity style={styles.searchButton} >
                    <Feather name="search" size={18} color="white" />
                </TouchableOpacity>
            </View>
            <ListOfSavedCities />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        paddingHorizontal: 15
    },
    cityText: {
        fontSize: 28,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white',
        marginTop: 50,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        height: 35,
        width: '100%',
    },
    input: {
        height: 35,
        borderRadius: 5,
        backgroundColor: 'rgba(179,179,179,0.3)',
        paddingHorizontal: 10,
        color: 'white',
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        width: '80%',
    },
    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: '15%',
        borderRadius: 5,
        backgroundColor: '#4ea2f5',
    }
});

export default CitiesListView;
