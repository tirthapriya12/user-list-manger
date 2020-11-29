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
                isAuthenticated: !!action.payload,
                user: action.payload
            }  
        default:
            return state;
    }
}