import { combineReducers } from 'redux';

import errReducer from './errReducer';
import authReducer from './authReducer';

export default combineReducers({
    errors: errReducer,
    auth: authReducer,
})