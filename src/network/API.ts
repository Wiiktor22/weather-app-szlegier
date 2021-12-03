const getWeatherByCoordsLink = (lat: number, lon: number) => (
    `http://api.openweathermap.org/data/2.5/weather?appid=a9da7325011280d0b734b6fe5b78703e&units=metric&lang=pl&lat=${lat}&lon=${lon}`
);

const getDetailsWeatherByCoordsLink = (lat: number, lon: number) => (
    `http://api.openweathermap.org/data/2.5/onecall?appid=a9da7325011280d0b734b6fe5b78703e&units=metric&lang=pl&lat=${lat}&lon=${lon}`
)

const linksGetters = {
    getWeatherByCoordsLink,
    getDetailsWeatherByCoordsLink
}

export default linksGetters;
