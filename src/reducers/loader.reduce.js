import { LOADING_ACTION } from './reducer.types';

const initialState = {
	loading: false,
};

const Loader = (state = initialState, action) => {
	switch (action.type) {
		case 'LOADING_ACTION':
			return { ...state, loading: action.payload };
			break;
		default:
			return state;
	}
};

export default Loader;
