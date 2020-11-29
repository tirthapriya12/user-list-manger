import types from '../actions/types';
const initialState = null

export default function (state = initialState, action) {

    switch (action.type) {
        case types.API_ERRORS: return action.payload
        default: return initialState;
    }
}