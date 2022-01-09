import React from "react";
import linksGetters from "./API";
import axios, { AxiosError } from 'axios';
import useApiResponseConvert from "./useApiResponseConvert";
import useWeatherStore from "./stores/WeatherStore";
import { WeatherObject } from "./stores/WeatherStore.types";
import { Alert } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

interface FetchHookObject {
    fetchWeatherByCoords: (providedLocations: { latitude: number, longitude: number }[]) => Promise<void>;
    fetchCoordsByCityName: (city: string) => Promise<void>;
}

const useFetch = (): FetchHookObject => {
    const { getWeatherByCoordsLink, getDetailsWeatherByCoordsLink, getCoordsByCityName } = linksGetters;
    const { convertSimpleWeatherObject, convertHourlyWeatherObject, convertDailyWeatherObject } = useApiResponseConvert();

    const [savedLocation, setSavedLocation] = useWeatherStore('savedLocation');
    const { getItem, setItem } = useAsyncStorage('persistSavedLocations');

    const fetchWeatherByCoords = async (providedLocations: { latitude: number, longitude: number }[]) => {
        let weather = [];

        for (const providedLocation of providedLocations) {
            const { latitude: lat, longitude: lon } = providedLocation;

            const url = getWeatherByCoordsLink(lat, lon);
            const { data } = await axios.get(url);

            const detailsUrl = getDetailsWeatherByCoordsLink(lat, lon);
            const { data: detailsData } = await axios.get(detailsUrl);

            const newWeather = convertSimpleWeatherObject(data);
            const hourlyWeather = convertHourlyWeatherObject(detailsData);
            const dailyWeather = convertDailyWeatherObject(detailsData);

            const copy = [...weather];
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
                weather = [...copy, newItem]
            } else {
                copy.splice(indexOfItem, 1, newItem);
                weather = copy;
            }
        }

        setSavedLocation(weather)
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
