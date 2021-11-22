import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {

}

const WeatherDetailsPanel: FC<Props> = ({ }) => {

    const firstRowOfData = useMemo(() => {
        const titles = ['odczuwalna', 'ciśnienie', 'wilgotność'];
        const fakeData = ['5 °C', '1002 hPa', '70%'];

        return titles.map((title, index) => ({
            title,
            data: fakeData[index]
        }))
    }, []);

    const secondRowOfData = useMemo(() => {
        const titles = ['wiatr', 'kierunek', 'zachód/wschód'];
        const fakeData = ['4 km/h', 'SE', '17:00'];

        return titles.map((title, index) => ({
            title,
            data: fakeData[index]
        }))
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>Pogoda (dziś)</Text>
                <View style={styles.divider} />
                <View style={styles.weatherStatsContainer}>
                    <View style={styles.rowOfData}>
                        {
                            firstRowOfData.map(({ title, data }) => (
                                <View style={styles.singleInfoContainer}>
                                    <Text style={styles.titleText}>{title}</Text>
                                    <Text style={styles.valueText}>{data}</Text>
                                </View>
                            ))
                        }
                    </View>
                    <View style={styles.rowOfData}>
                        {
                            secondRowOfData.map(({ title, data }) => (
                                <View style={styles.singleInfoContainer}>
                                    <Text style={styles.titleText}>{title}</Text>
                                    <Text style={styles.valueText}>{data}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 180,
        backgroundColor: '#83BBF2',
        borderRadius: 12,
        marginBottom: 20
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
    weatherStatsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    rowOfData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    singleInfoContainer: {
        width: '30%',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    titleText: {
        fontSize: 12,
        fontFamily: 'Montserrat_400Regular',
        color: 'white'
    },
    valueText: {
        fontSize: 15,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white'
    },

})

export default WeatherDetailsPanel;
