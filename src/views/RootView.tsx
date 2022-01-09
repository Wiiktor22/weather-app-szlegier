import React, { FC } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TodayWeatherPanel from '../components/RootView/TodayWeatherPanel';
import ClosestHoursPanel from '../components/RootView/ClosestHoursPanel';
import ClosestDaysPanel from '../components/RootView/ClosestDaysPanel';
import WeatherDetailsPanel from '../components/RootView/WeatherDetailsPanel';
import { useRoute } from '@react-navigation/native';

const RootView: FC = () => {
    const route = useRoute();
    const { params } = route;

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <TodayWeatherPanel weather={params?.weather?.current} />
                <ClosestHoursPanel weather={params?.weather?.hourly} />
                <ClosestDaysPanel weather={params?.weather?.daily} />
                <WeatherDetailsPanel weather={params?.weather?.current} />
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#4ea2f5',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20
    },
    contentContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

export default RootView;