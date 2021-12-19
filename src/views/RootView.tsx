import React, { FC } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TodayWeatherPanel from '../components/RootView/TodayWeatherPanel';
import ClosestHoursPanel from '../components/RootView/ClosestHoursPanel';
import ClosestDaysPanel from '../components/RootView/ClosestDaysPanel';
import WeatherDetailsPanel from '../components/RootView/WeatherDetailsPanel';
import useWeatherStore from '../network/stores/WeatherStore';

const RootView: FC = () => {
    const [savedLocation] = useWeatherStore('savedLocation');

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <TodayWeatherPanel weather={savedLocation?.[0]?.current} />
                <ClosestHoursPanel weather={savedLocation?.[0]?.hourly} />
                <ClosestDaysPanel weather={savedLocation?.[0]?.daily} />
                <WeatherDetailsPanel weather={savedLocation?.[0]?.current} />
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