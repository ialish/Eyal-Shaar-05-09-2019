import {
	SET_ROUTE,
	SET_LOCATION,
	REQUEST_CURRENT_POSITION
} from './actionTypes'

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
		dispatch({ type: REQUEST_CURRENT_POSITION.PENDING });
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
							type: REQUEST_CURRENT_POSITION.FAILED,
							payload: error.message
						}))
					.then((data) => dispatch({
						type: REQUEST_CURRENT_POSITION.SUCCESS,
						payload: {
							key: data.Key,
							city: data.LocalizedName
						}
					}));
			});
		}
	}
}