import { LOADING_ACTION } from '../reducers/reducer.types';

export function LoadingAction(status) {
    return dispatch => {
        dispatch({type: LOADING_ACTION, payload: status});
    }
}