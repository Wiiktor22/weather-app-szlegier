import React from "react";
import linksGetters from "./API";
import axios, { AxiosError } from 'axios';
import useApiResponseConvert from "./useApiResponseConvert";
import useWeatherStore from "./stores/WeatherStore";
import { WeatherObject } from "./stores/WeatherStore.types";

interface FetchHookObject {
    fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>
}

const useFetch = (): FetchHookObject => {
    const { getWeatherByCoordsLink, getDetailsWeatherByCoordsLink } = linksGetters;
    const { convertSimpleWeatherObject, convertHourlyWeatherObject, convertDailyWeatherObject } = useApiResponseConvert();
    const [savedLocation, setSavedLocation] = useWeatherStore('savedLocation');

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

    return {
        fetchWeatherByCoords
    }
};

export default useFetch;
