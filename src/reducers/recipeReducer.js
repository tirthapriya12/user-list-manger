import types from '../actions/types';

const initialState = {
    recipes: [],
    loading: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.GET_RESCIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            }
        case types.RECIPES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}