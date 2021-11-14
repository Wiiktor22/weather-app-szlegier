import React, { FC, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import useUtils from '../../hooks/useUtils';

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

}

const ClosestDaysPanel: FC<Props> = ({}) => {
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
                                <Text>image</Text>
                                <Text style={styles.temperatureText}>8°C</Text>
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
    }
})

export default ClosestDaysPanel;