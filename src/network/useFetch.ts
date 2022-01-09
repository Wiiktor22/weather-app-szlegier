import React from "react";
import linksGetters from "./API";
import axios, { AxiosError } from 'axios';
import useApiResponseConvert from "./useApiResponseConvert";
import useWeatherStore from "./stores/WeatherStore";
import { WeatherObject } from "./stores/WeatherStore.types";
import { Alert } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

interface FetchHookObject {
    fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
    fetchCoordsByCityName: (city: string) => Promise<void>;
}

const useFetch = (): FetchHookObject => {
    const { getWeatherByCoordsLink, getDetailsWeatherByCoordsLink, getCoordsByCityName } = linksGetters;
    const { convertSimpleWeatherObject, convertHourlyWeatherObject, convertDailyWeatherObject } = useApiResponseConvert();
    
    const [savedLocation, setSavedLocation] = useWeatherStore('savedLocation');
    const { getItem, setItem } = useAsyncStorage('persistSavedLocations');

    const fetchWeatherByCoords = async (lat: number, lon: number) => {
        const url = getWeatherByCoordsLink(lat, lon);
        const { data } = await axios.get(url);

        const detailsUrl = getDetailsWeatherByCoordsLink(lat, lon);
        const { data: detailsData } = await axios.get(detailsUrl);

        const newWeather = convertSimpleWeatherObject(data);
        const hourlyWeather = convertHourlyWeatherObject(detailsData);
        const dailyWeather = convertDailyWeatherObject(detailsData);
        
        const copy = [...savedLocation];
        const indexOfItem = copy.findIndex(w => {
            const { lon: newLon, lat: newLat } = newWeather.coord;
            const { lon, lat } = w.current.coord;
            return newLon === lon && lat === newLat;
        })

        const newItem: WeatherObject = {
            current: newWeather,
            hourly: hourlyWeather,
            daily: dailyWeather
        }

        if (indexOfItem === -1) {
            setSavedLocation([...copy, newItem]);
        } else {
            copy.splice(indexOfItem, 1, newItem);
            setSavedLocation(copy);
        }
    }

    const fetchCoordsByCityName = async (city: string) => {
        const url = getCoordsByCityName(city);
        const { data } = await axios.get(url);

        if (data.length === 0) {
            Alert.alert(
                'Błąd!',
                `Nie znaleziono miasta: ${city}`
            )
        } else {
            const newCity = {
                name: data[0]?.name,
                latitude: data[0]?.lat,
                longitude: data[0]?.lon
            }

            let alreadySavedPersistLocations: any = await getItem();
            alreadySavedPersistLocations = alreadySavedPersistLocations === null ? [] : JSON.parse(alreadySavedPersistLocations);
            alreadySavedPersistLocations = [...alreadySavedPersistLocations, newCity];
            setItem(JSON.stringify(alreadySavedPersistLocations));

            fetchWeatherByCoords(newCity.latitude, newCity.longitude);
        }
    }

    return {
        fetchWeatherByCoords,
        fetchCoordsByCityName
    }
};

export default useFetch;
