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
	CLEAR_DATA,
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
					.then((response) => response.json())
					.then((data) => dispatch({
						type: REQUEST_CURRENT_POSITION_SUCCESS,
						payload: {
							key: data.Key,
							city: data.LocalizedName
						}
					}))
					.catch((error) => dispatch({
						type: REQUEST_CURRENT_POSITION_FAILED,
						payload: error.message
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
			.then((response) => response.json())
			.then((data) => dispatch({
				type: REQUEST_SEARCH_OPTIONS_SUCCESS,
				payload: data
			}))
			.catch((error) => dispatch({
				type: REQUEST_SEARCH_OPTIONS_FAILED,
				payload: error.message
			}));
	}
}

/* CurrentWeather component */

export const requestCurrentWeather = (location) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_CURRENT_WEATHER_PENDING });
		const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
		return fetch(url)
			.then((response) => response.json())
			.then((data) => dispatch({
				type: REQUEST_CURRENT_WEATHER_SUCCESS,
				payload: {
					city: location.city,
					degreesC: data[0].Temperature.Metric.Value,
					weatherText: data[0].WeatherText
				}
			}))
			.catch((error) => dispatch({
				type: REQUEST_CURRENT_WEATHER_FAILED,
				payload: error.message
			}));
	}
}

/* FiveDayForecast component */

export const requestFiveDayForecast = (location) => {
	return (dispatch) => {
		dispatch({ type: REQUEST_FIVE_DAY_FORECAST_PENDING });
		const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.key}?apikey=${apiKey}&metric=true`;
		return fetch(url)
			.then((response) => response.json())
			.then((data) => dispatch({
				type: REQUEST_FIVE_DAY_FORECAST_SUCCESS,
				payload: data.DailyForecasts
			}))
			.catch((error) => dispatch({
				type: REQUEST_FIVE_DAY_FORECAST_FAILED,
				payload: error.message
			}));
	}
}

/* Favorites component */

export const clearFavCitiesData = () => {
	return {
		type: CLEAR_DATA,
		payload: []
	}
}

export const requestFavoritesCurrentConditions = (favCities) => {
	return (dispatch) => {
		favCities.forEach((location) => {
			dispatch({ type: REQUEST_FAVORITES_CURRENT_CONDITIONS_PENDING });
			const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
			return fetch(url)
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: REQUEST_FAVORITES_CURRENT_CONDITIONS_SUCCESS,
						payload: {
							location,
							degreesC: Math.round(data[0].Temperature.Metric.Value),
							weatherText: data[0].WeatherText
						}
					})
				})
				.catch((error) => dispatch({
					type: REQUEST_FAVORITES_CURRENT_CONDITIONS_FAILED,
					payload: error.message
				}));
		});
	}
}