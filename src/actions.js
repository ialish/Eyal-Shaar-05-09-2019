import { SET_LOCATION, REQUEST_CURRENT_POSITION } from './actionTypes'

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
					.then((response) => response.json())
					.then((data) => dispatch({
						type: REQUEST_CURRENT_POSITION.SUCCESS,
						payload: {
							key: data.Key,
							city: data.LocalizedName
						}
					}))
					.catch((error) => dispatch({
						type: REQUEST_CURRENT_POSITION.FAILED,
						payload: error.message
					}));
			});
		}
	}
}