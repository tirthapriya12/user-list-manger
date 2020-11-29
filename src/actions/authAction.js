import { setAuthToken } from '../utils/auth';
import types            from './types';

const BASE_URL = 'https://reqres.in';

export const registerUser = (userData, callBack) => (dispatch) => {

    fetch(BASE_URL + '/api/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        }
    })
        .then(res => res.json())
        .then((res) => {
            typeof callBack === 'function' && callBack();
        })
        .catch((err) => {
            dispatch({
                type: types.API_ERRORS,
                payload: err
            })

        });
}

export const loginUser = (userData, callBack) => (dispatch) => {
    fetch(BASE_URL + '/api/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        }
    })
        .then(res => res.json())
        .then((res) => {
            if (res.error) throw Error(res.error);

            let token = res.data.token;
            setAuthToken(token);
            dispatch(setCurrentUser({ email: userData.email }))
            typeof callBack === 'function' && callBack();
        }).catch((err) => {
            dispatch({
                type: types.API_ERRORS,
                payload: err
            })

        });
}

export const setCurrentUser = (payload) => ({
    type: types.SET_CURRENT_USER,
    payload
})

export const logoutUser = () => dispatch => {
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser(null));
};