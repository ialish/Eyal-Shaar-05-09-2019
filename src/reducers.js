import { SET_LOCATION, REQUEST_CURRENT_POSITION } from './actionTypes'

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