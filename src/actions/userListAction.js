import types from './types';

const BASE_URL = 'https://reqres.in';

export const getUserList = (pageNum) => (dispatch) => {
    pageNum = pageNum || 1;
    fetch(BASE_URL + `/api/users?page=${pageNum}&delay=5`)
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

export const deleteUser = (users, id) => (dispatch) => {
    fetch(BASE_URL + '/api/users/' + id, {
        method: 'DELETE'
    }).then((res) => {
            dispatch({
                type: types.DELETE_USER,
                payload: users.filter((user) => user.id !== id)
            })
        })
}