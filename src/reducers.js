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
	REQUEST_FAVORITES_CURRENT_CONDITIONS_PENDING,
	REQUEST_FAVORITES_CURRENT_CONDITIONS_SUCCESS,
	REQUEST_FAVORITES_CURRENT_CONDITIONS_FAILED
} from './actionTypes';

/* App component */

const initialStateRoute = {
	route: 'home'
};

export const changeRoute = (state = initialStateRoute, action) => {
	switch(action.type) {
		case SET_ROUTE:
			return { ...state, ...{ route: action.payload } };
		default:
			return state;
	}
}

const defaultLocation = {
	key: '215854',
	city: 'Tel Aviv'
};

const initialStateLocation = {
	isPending: false,
	location: defaultLocation,
	error: ''
};

export const changeLocation = (state = initialStateLocation, action) => {
	switch (action.type) {
		case SET_LOCATION:
			return { ...state, ...{ location: action.payload } };
		case REQUEST_CURRENT_POSITION_PENDING:
			return { ...state, ...{ isPending: true } };
		case REQUEST_CURRENT_POSITION_SUCCESS:
			return { ...state, ...{ location: action.payload, isPending: false } };
		case REQUEST_CURRENT_POSITION_FAILED:
			return { ...state, ...{ error: action.payload, isPending: false } };
		default:
			return state;
	}
}

/* SearchField component */

const initialStateInput = {
	query: '',
	isLoading: false,
	options: [],
	error: ''
};

export const changeInput = (state = initialStateInput, action) => {
	switch (action.type) {
		case UPDATE_INPUT:
			return { ...state, ...{ query: action.payload } };
		case REQUEST_SEARCH_OPTIONS_PENDING:
			return { ...state, ...{ isLoading: true } };
		case REQUEST_SEARCH_OPTIONS_SUCCESS:
			return { ...state, ...{ options: action.payload, isLoading: false } };
		case REQUEST_SEARCH_OPTIONS_FAILED:
			return { ...state, ...{ error: action.payload, isLoading: false } };
		default:
			return state;
	}
}

/* CurrentWeather component */

const initialStateCurrentWeather = {
	isPending: false,
	currentWeatherData: {
		city: '',
		degreesC: null,
		weatherText: ''
	},
	error: ''
};

export const changeCurrentWeather = (state = initialStateCurrentWeather, action) => {
	switch (action.type) {
		case REQUEST_CURRENT_WEATHER_PENDING:
			return { ...state, ...{ isPending: true } };
		case REQUEST_CURRENT_WEATHER_SUCCESS:
			return { ...state, ...{ currentWeatherData: action.payload, isPending: false } };
		case REQUEST_CURRENT_WEATHER_FAILED:
			return { ...state, ...{ error: action.payload, isPending: false } };
		default:
			return state;
	}
}

/* FiveDayForecast component */

const initialStateFiveDayForecast = {
	isPending: false,
	DailyForecasts: [],
	error: ''
};

export const changeFiveDayForecast = (state = initialStateFiveDayForecast, action) => {
	switch (action.type) {
		case REQUEST_FIVE_DAY_FORECAST_PENDING:
			return { ...state, ...{ isPending: true } };
		case REQUEST_FIVE_DAY_FORECAST_SUCCESS:
			return { ...state, ...{ DailyForecasts: action.payload, isPending: false } };
		case REQUEST_FIVE_DAY_FORECAST_FAILED:
			return { ...state, ...{ error: action.payload, isPending: false } };
		default:
			return state;
	}
}

/* Favorites component */

const initialStateFavorites = {
	isPending: false,
	favCitiesData: [],
	error: ''
};

export const updateFavorites = (state = initialStateFavorites, action) => {
	switch (action.type) {
		case REQUEST_FAVORITES_CURRENT_CONDITIONS_PENDING:
			return { ...state, ...{ isPending: true } };
		case REQUEST_FAVORITES_CURRENT_CONDITIONS_SUCCESS:
			return { ...state, ...{ favCitiesData: action.payload, isPending: false } };
		case REQUEST_FAVORITES_CURRENT_CONDITIONS_FAILED:
			return { ...state, ...{ error: action.payload, isPending: false } };
		default:
			return state;
	}
}