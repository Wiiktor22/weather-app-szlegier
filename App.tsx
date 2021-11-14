import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/nav/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold
  })

  return (
    <>
      {
        fontsLoaded ? (
          <SafeAreaProvider>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        ) : null
      }
    </>
  )
};

export default App;
