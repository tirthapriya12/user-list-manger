import types from './types';

export const setPaymenDetails = (paymentDetails) => {
    
    return {
        type: types.SET_PAYMENT,
        payload: paymentDetails
    }
}