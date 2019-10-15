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
				const apiKey = process.env.REACT_APP_API_KEY;
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
		const apiKey = process.env.REACT_APP_API_KEY;
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