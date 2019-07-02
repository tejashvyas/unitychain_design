import { CHANGE_OS_DESIGN } from './reducer.types';

const initialState = {
	osDesign: false
};

const OS = (state = initialState, action) => {
	switch (action.type) {		
		case 'CHANGE_OS_DESIGN':
			return {...state, osDesign: action.payload};
			break;
		default:
			return state;
	}
};

export default OS
