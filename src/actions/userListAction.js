import types from './types';

const BASE_URL = 'https://reqres.in';

export const getUserList = () => (dispatch) => {

    fetch(BASE_URL + '/api/users?page=2&delay=5')
        .then(res => res.json())
        .then((res) => {
            if (res.error) throw Error(res.error);
            dispatch({
                type: types.LIST_USERS,
                payload: res
            })
        })
        .catch((err) => {
            dispatch({
                type: types.API_ERRORS,
                payload: err
            })

        });
    
}