import React from 'react';
import { connect } from 'react-redux'
import { getAuthToken } from '../../utils/auth';
import { Redirect } from 'react-router-dom';

const AuthenticatedLayer = (props) => {
    const isAuthenticated = !!getAuthToken() && props.auth;

    if (isAuthenticated)
        return (<>{props.children}</>)

    else
        return <Redirect to="/login" />;
}

export default connect(store => ({ auth: store.auth }))(AuthenticatedLayer)

