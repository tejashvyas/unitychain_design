import { CHANGE_OS_DESIGN } from '../reducers/reducer.types'

export const ChangeOsDesign = (data) => {
    return dispatch => {
        return dispatch({type: CHANGE_OS_DESIGN, payload: data})
    }
}