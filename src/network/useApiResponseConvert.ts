import React from "react";
import { CurrentWeatherDetails, HourlyWeatherObject } from "./stores/WeatherStore.types";

interface ApiResponseConvertObject {
    convertSimpleWeatherObject: (responseData: any) => CurrentWeatherDetails;
    convertHourlyWeatherObject: (responseData: any) => HourlyWeatherObject[];
}

const useApiResponseConvert = (): ApiResponseConvertObject => {

    const convertSimpleWeatherObject = (responseData: any): CurrentWeatherDetails => {        
        const convertedObject: CurrentWeatherDetails = {
            coord: {
                lon: responseData.coord.lon,
                lat: responseData.coord.lat
            },
            description: responseData.weather[0].description,
            feelsLikeTemp: responseData.main.feels_like,
            humidity: responseData.main.humidity,
            iconID: responseData.weather[0].icon,
            main: responseData.weather[0].main,
            maxTemp: responseData.main.temp_max,
            minTemp: responseData.main.temp_min,
            name: responseData.name,
            pressure: responseData.main.pressure,
            sunrise: responseData.sys.sunrise,
            sunset: responseData.sys.sunset,
            temp: responseData.main.temp,
            visibility: responseData.visibility,
            windDeg: responseData.wind.deg,
            windSpeed: responseData.wind.speed
        };

        return convertedObject;
    }

    const convertHourlyWeatherObject = (responseData: any): HourlyWeatherObject[] => {
        let hourly: any = [];

        for (let i = 0; i < 7; i++) {
            const weather = responseData.hourly[i];
            console.log('----')
            console.log(weather);
            const newItem = {
                temp: weather.temp,
                iconID: weather.weather[0].icon
            }
            
            hourly = [...hourly, newItem];
        }

        return hourly;
    }

    return {
        convertSimpleWeatherObject,
        convertHourlyWeatherObject
    }
};

export default useApiResponseConvert;
