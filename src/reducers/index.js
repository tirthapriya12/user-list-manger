import { combineReducers }  from 'redux';

import errReducer           from './errReducer';
import authReducer          from './authReducer';
import userListReducer      from './userListReducer';

export default combineReducers({
    errors: errReducer,
    auth: authReducer,
    userlist: userListReducer
})