import types from '../actions/types';

const initialState = {
    users: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.LIST_USERS:
            return {
                ...state,
                users: action.payload.data,
                ...action.payload
            }
        case types.DELETE_USER:
            return {
                ...state,
                users: action.payload
            }           
        default:
            return state;
    }
}