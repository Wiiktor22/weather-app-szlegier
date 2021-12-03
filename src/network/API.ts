console.log(process.env.API_KEY);

const getWeatherByCoordsLink = (lat: number, lon: number) => (
    `http://api.openweathermap.org/data/2.5/weather?appid=a9da7325011280d0b734b6fe5b78703e&units=metric&lang=pl&lat=${lat}&lon=${lon}`
);

const linksGetters = {
    getWeatherByCoordsLink
}

export default linksGetters;
