import types from '../actions/types';

const initialState = {
    user: null,
    isAuthenticated: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.payload.id,
                user: action.payload
            }
        case types.LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }  
        default:
            return state;
    }
}