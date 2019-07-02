import { combineReducers } from 'redux';
import Users from './User/User.reducer';
import { Auth, toggleUrl } from './auth.reducer';
import OS from './os.reducer'
import Loader from './loader.reduce'

export default combineReducers({
    Users,
    Auth,
    OS,
    toggleUrl,
    Loader
})