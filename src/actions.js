/* App component */
import {
	SET_ROUTE,
	SET_LOCATION,
	REQUEST_CURRENT_POSITION_PENDING,
	REQUEST_CURRENT_POSITION_SUCCESS,
	REQUEST_CURRENT_POSITION_FAILED
} from './actionTypes';

/* SearchField component */
import {
	UPDATE_INPUT,
	REQUEST_SEARCH_OPTIONS_PENDING,
	REQUEST_SEARCH_OPTIONS_SUCCESS,
	REQUEST_SEARCH_OPTIONS_FAILED
} from './actionTypes';

/* FavoritesButton component */
import HeartHollow from './components/FavoritesButton/HeartHollow.svg';
import HeartFull from './components/FavoritesButton/HeartFull.svg';
import {
	SET_HEART,
	ADD_CITY,
	REMOVE_CITY
} from './actionTypes';

/* CurrentWeather component */
import {
	REQUEST_CURRENT_WEATHER_PENDING,
	REQUEST_CURRENT_WEATHER_SUCCESS,
	REQUEST_CURRENT_WEATHER_FAILED
} from './actionTypes';

/* FiveDayForecast component */
import {
	REQUEST_FIVE_DAY_FORECAST_PENDING,
	REQUEST_FIVE_DAY_FORECAST_SUCCESS,
	REQUEST_FIVE_DAY_FORECAST_FAILED
} from './actionTypes';

/* Favorites component */
import {
	REQUEST_FAVORITES_CURRENT_CONDITIONS_PENDING,
	REQUEST_FAVORITES_CURRENT_CONDITIONS_SUCCESS,
	REQUEST_FAVORITES_CURRENT_CONDITIONS_FAILED
} from './actionTypes';

const apiKey = process.env.REACT_APP_API_KEY;

/* App component */

export const setRoute = (route) => {
	return {
		type: SET_ROUTE,
		payload: route
	}
}

export const setLocation = (location) => {
	return {
		type: SET_LOCATION,
		payload: location
	}
}

export const requestCurrentPosition = () => {
	return (dispatch) => {
		dispatch({ type: REQUEST_CURRENT_POSITION_PENDING });
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}`;
				return fetch(url)
					.then(
						(response) => response.json(),
						// It's not good to use catch because that will also catch any 
						// errors in the dispatch and resulting render, causing a loop 
						// of 'Unexpected batch number' errors.
						(error) => dispatch({
							type: REQUEST_CURRENT_POSITION_FAILED,
							payload: error.message
						}))
					.then((data) => dispatch({
						type: REQUEST_CURRENT_POSITION_SUCCESS,
						payload: {
							key: data.Key,
							city: data.LocalizedName
						}
					}));
			});
		}
	}
}

/* SearchField component */

export const updateInput = (query) => {
	return {
		type: UPDATE_INPUT,
		payload: query
	}
}

export const requestSearchOptions = (query) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_SEARCH_OPTIONS_PENDING });
		const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;
		return fetch(url)
			.then(
				(response) => response.json(),
				(error) => dispatch({
					type: REQUEST_SEARCH_OPTIONS_FAILED,
					payload: error.message
				}))
			.then((data) => dispatch({
				type: REQUEST_SEARCH_OPTIONS_SUCCESS,
				payload: data
			}));
	}
}

/* FavoritesButton component */

export const setHeart = (favCities, location, heartImage) => {
	if (favCities) {
		if (favCities.find(element => element.key === location.key)) {
			if (heartImage === HeartHollow)
				return {
					type: SET_HEART,
					payload: {
						favCities,
						heartImage: HeartFull
					}
				}
		} else {
			if (heartImage === HeartFull)
				return {
					type: SET_HEART,
					payload: {
						favCities,
						heartImage: HeartHollow
					}
				}
		}
	}
}

export const addRemoveCity = (favCities, location, heartImage) => {
	let array;

	if (favCities) {
		array = [...favCities];
	} else {
		array = [];
	}

	if (heartImage === HeartHollow) {
		array.push(location);
		return {
			type: ADD_CITY,
			payload: {
				favCities: array,
				heartImage: HeartFull
			}
		}
	} else {
		const index = array.findIndex(element =>
			element.key === location.key);

		array.splice(index, 1);
		return {
			type: REMOVE_CITY,
			payload: {
				favCities: array,
				heartImage: HeartHollow
			}
		}
	}
}

/* CurrentWeather component */

export const requestCurrentWeather = (location) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_CURRENT_WEATHER_PENDING });
		const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
		return fetch(url)
			.then(
				(response) => response.json(),
				(error) => dispatch({
					type: REQUEST_CURRENT_WEATHER_FAILED,
					payload: error.message
				}))
			.then((data) => dispatch({
				type: REQUEST_CURRENT_WEATHER_SUCCESS,
				payload: {
					city: location.city,
					degreesC: data[0].Temperature.Metric.Value,
					weatherText: data[0].WeatherText
				}
			}));
	}
}

/* FiveDayForecast component */

export const requestFiveDayForecast = (location) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_FIVE_DAY_FORECAST_PENDING });
		const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.key}?apikey=${apiKey}&metric=true`;
		return fetch(url)
			.then(
				(response) => response.json(),
				(error) => dispatch({
					type: REQUEST_FIVE_DAY_FORECAST_FAILED,
					payload: error.message
				}))
			.then((data) => dispatch({
				type: REQUEST_FIVE_DAY_FORECAST_SUCCESS,
				payload: data.DailyForecasts
			}));
	}
}

/* Favorites component */

export const requestFavoritesCurrentConditions = (favCities) => {
	return (dispatch) => {
		favCities.forEach((location) => {
			dispatch({ type: REQUEST_FAVORITES_CURRENT_CONDITIONS_PENDING });
			const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
			return fetch(url)
				.then(
					(response) => response.json(),
					(error) => dispatch({
						type: REQUEST_FAVORITES_CURRENT_CONDITIONS_FAILED,
						payload: error.message
					}))
				.then((data) => {
					dispatch({
						type: REQUEST_FAVORITES_CURRENT_CONDITIONS_SUCCESS,
						payload: {
							location,
							degreesC: Math.round(data[0].Temperature.Metric.Value),
							weatherText: data[0].WeatherText
						}
					})
				});
		});
	}
}