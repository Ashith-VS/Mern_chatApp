import { isEmpty } from 'lodash';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {

    const token = localStorage.getItem('auth_token');

    return (
        !isEmpty(token) ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute