import {
	SET_ROUTE,
	SET_LOCATION,
	REQUEST_CURRENT_POSITION
} from './actionTypes'

import {
	UPDATE_INPUT,
	REQUEST_SEARCH_OPTIONS
} from './actionTypes'

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
		case REQUEST_CURRENT_POSITION.PENDING:
			return { ...state, ...{ isPending: true } };
		case REQUEST_CURRENT_POSITION.SUCCESS:
			return { ...state, ...{ location: action.payload, isPending: false } };
		case REQUEST_CURRENT_POSITION.FAILED:
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
		case REQUEST_SEARCH_OPTIONS.PENDING:
			return { ...state, ...{ isLoading: true } };
		case REQUEST_SEARCH_OPTIONS.SUCCESS:
			return { ...state, ...{ options: action.payload, isLoading: false } };
		case REQUEST_SEARCH_OPTIONS.FAILED:
			return { ...state, ...{ error: action.payload, isLoading: false } };
		default:
			return state;
	}
}