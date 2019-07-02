import { ACTION_TYPE } from '../reducer.types';

const User = (state={}, action) => {
    switch(action.type) {
        case 'ACTION_TYPE':
            return state;
        default:
            return state;
    }
}

export default User;