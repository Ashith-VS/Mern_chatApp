import { isEmpty } from 'lodash';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { currentUserAuth } from '../redux/slice/commonSlice';
import { UrlEndPoint } from '../http/apiConfig';
import networkRequest from '../http/api';

const PrivateRoute = () => {
    const isAuthenticated = true

    // const dispatch = useDispatch();
    // const fetchCurrentUser = async () => {
    //     try {
    //         const url = UrlEndPoint.currentUser
    //         const res = await networkRequest({ url })
    //         dispatch(currentUserAuth(res.user))
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    // const token = localStorage.getItem('auth_token');
    // console.log('token: ', token);

    // useEffect(() => {
    //     if (!isEmpty(token) && isEmpty(currentUser)) {
    //         fetchCurrentUser()
    //         // fetchChats();
    //     }
    // }, [])
    // // const currentUser = false
    // const { currentUser } = useSelector(state => state.common)
    // const isAuthenticated = isEmpty(currentUser);
    // // if (currentUser === null) {
    // //     // Handle loading state if needed, or redirect immediately.
    // //     return <div>Loading...</div>;
    // // }
    // console.log('currentUser: ', currentUser);

    // console.log('isEmpty(currentUser): ', !isEmpty(currentUser));


    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute