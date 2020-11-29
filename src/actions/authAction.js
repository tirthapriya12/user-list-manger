import { setAuthToken } from '../utils/auth';
import types            from './types';

const BASE_URL = 'https://reqres.in';

export const registerUser = (userData, successCallBack) => (dispatch) => {
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
            if (res.error) throw Error(res.error);

            typeof successCallBack === 'function' && successCallBack();
        })
        .catch((err) => {
            dispatch({
                type: types.API_ERRORS,
                payload: err
            })

        });
}

export const loginUser = (userData, successCallBack) => (dispatch) => {
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

            let token = res.token;
            setAuthToken(token);
            dispatch(setCurrentUser({ email: userData.email, token: token }))
            typeof successCallBack === 'function' && successCallBack();
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