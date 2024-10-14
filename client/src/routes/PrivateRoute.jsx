import { isEmpty } from 'lodash';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { currentUserAuth } from '../redux/slice/commonSlice';
import { UrlEndPoint } from '../http/apiConfig';
import networkRequest from '../http/api';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        try {
            const url = UrlEndPoint.currentUser
            const res = await networkRequest({ url })
            dispatch(currentUserAuth(res.user))
        } catch (error) {
            console.error(error)
        }
    }
    const token = localStorage.getItem('auth_token');
    const { currentUser } = useSelector(state => state.common)


    useEffect(() => {
        if (!isEmpty(token) && isEmpty(currentUser)) {
            console.log('!isEmpty(token) && isEmpty(currentUser): ', !isEmpty(token) && !isEmpty(currentUser));
            fetchCurrentUser()
        }
    }, [token, currentUser])

    return (
        !isEmpty(currentUser)? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute