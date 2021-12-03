export interface CurrentWeatherDetails {
    coord: {
        lon: number;
        lat: number;
    },
    description: string;
    iconID: string;
    main: string;
    temp: number;
    feelsLikeTemp: number;
    minTemp: number;
    maxTemp: number;
    pressure: number;
    humidity: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    sunrise: number;
    sunset: number;
    name: string;
}

export interface HourlyWeatherObject {
    temp: number;
    iconID: string;
}

export interface WeatherObject {
    current: CurrentWeatherDetails;
    hourly: HourlyWeatherObject[];
    daily: HourlyWeatherObject[];
}