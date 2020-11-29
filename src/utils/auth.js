export const setAuthToken = token => {
    if (token) {
        sessionStorage.setItem('token', token);
    } else {
        sessionStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    return sessionStorage.getItem('token');
}