import React from "react";
import linksGetters from "./API";
import axios from 'axios';
import useApiResponseConvert from "./useApiResponseConvert";
import useWeatherStore from "./stores/WeatherStore";

interface FetchHookObject {
    fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>
}

const useFetch = (): FetchHookObject => {
    const { getWeatherByCoordsLink } = linksGetters;
    const { convertSimpleWeatherObject } = useApiResponseConvert();
    const [savedLocation, setSavedLocation] = useWeatherStore('savedLocation');

    const fetchWeatherByCoords = async (lat: number, lon: number) => {
        const url = getWeatherByCoordsLink(lat, lon);
        const { data } = await axios.get(url);

        const newWeather = convertSimpleWeatherObject(data);
        
        const copy = [...savedLocation];
        const indexOfItem = copy.findIndex(w => {
            const { lon: newLon, lat: newLat } = newWeather.coord;
            const { lon, lat } = w.current.coord;
            return newLon === lon && lat === newLat;
        })

        if (indexOfItem === -1) {
            setSavedLocation([...copy, { current: newWeather }]);
        } else {
            copy.splice(indexOfItem, 1, { current: newWeather });
            setSavedLocation(copy);
        }
    }

    return {
        fetchWeatherByCoords
    }
};

export default useFetch;
