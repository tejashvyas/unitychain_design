import { AUTHENTICATION_TYPE, SOCIAL_AUTH_ACTION, CHANGE_TOGGLE } from './reducer.types';
import lodash from 'lodash';

const initialState = {
	isAuthenticate: false,
	user: {},
};

export const Auth = (state = initialState, action) => {
	switch (action.type) {
		case 'AUTHENTICATION_TYPE':
			return Object.assign({}, state, {
				isAuthenticate: !lodash.isEmpty(action.user),
				user: action.user,
			});
		case SOCIAL_AUTH_ACTION:
			let obj = state;
			obj.user.auth[action.payload] = true;
			return obj;
		default:
			return state;
	}
};

const initialToggleState = {
	toggle: true,
};

export const toggleUrl = (state = initialToggleState, action) => {
	switch (action.type) {
		case 'CHANGE_TOGGLE':
			return { ...state, toggle: action.data };
		default:
			return state;
	}
};
