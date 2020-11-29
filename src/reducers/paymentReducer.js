import types from '../actions/types';

const initialState = {
    paymentDetails: null,
    otpCheck: 123456
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.SET_PAYMENT:
            return {
                ...state,
                paymentDetails: action.payload,
            }
        default:
            return state;
    }
}