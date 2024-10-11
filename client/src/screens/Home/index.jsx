import React, { useEffect } from 'react'
import List from './List'
import Chat from './Chat'
import Detail from './Detail'
import "./home.css"
import { UrlEndPoint } from '../../http/apiConfig'
import networkRequest from '../../http/api'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserAuth } from '../../redux/slice/commonSlice'
import { isEmpty } from 'lodash'

const Home = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.common)
    const token = localStorage.getItem('auth_token');

    const fetchCurrentUser = async () => {
        try {
            const url = UrlEndPoint.currentUser
            const res = await networkRequest({ url })
            dispatch(currentUserAuth(res.user))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!isEmpty(token) && isEmpty(currentUser)) {
            fetchCurrentUser()
        }
    }, [])

    return (
        <>
            <List />
            <Chat />
            <Detail />
        </>
    )
}

export default Home