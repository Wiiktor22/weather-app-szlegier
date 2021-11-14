import React, { FC } from 'react';
import { Text, View, StyleSheet,  } from 'react-native';
import TodayWeatherPanel from '../components/RootView/TodayWeatherPanel';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootView: FC = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView
                // edges={['top', 'bottom']}
                style={styles.contentContainer}
            >
                <TodayWeatherPanel />
            </SafeAreaView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        //backgroundColor: '#83BBF2',
        backgroundColor: '#4ea2f5'
    },
    contentContainer: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'green'
    }
});

export default RootView;