import { createGlobalState } from 'react-hooks-global-state';
import { WeatherObject } from './WeatherStore.types';

const initialState = {
    savedLocation: [] as WeatherObject[]
};

export type WeatherStore = typeof initialState;

const { useGlobalState: useWeatherStore } = createGlobalState(initialState);

export default useWeatherStore;
