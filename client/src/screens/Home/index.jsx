// import React, { useEffect } from 'react'
// import List from './List'
// import Chat from './Chat'
// import Detail from './Detail'
// import "./home.css"
// import { UrlEndPoint } from '../../http/apiConfig'
// import networkRequest from '../../http/api'
// import { useDispatch, useSelector } from 'react-redux'
// import { currentUserAuth } from '../../redux/slice/commonSlice'
// import { isEmpty } from 'lodash'

// const Home = () => {
//     const dispatch = useDispatch()
//     const { currentUser } = useSelector(state => state.common)
//     const token = localStorage.getItem('auth_token');

//     const fetchCurrentUser = async () => {
//         try {
//             const url = UrlEndPoint.currentUser
//             const res = await networkRequest({ url })
//             dispatch(currentUserAuth(res.user))
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     useEffect(() => {
//         if (!isEmpty(token) && isEmpty(currentUser)) {
//             fetchCurrentUser()
//         }
//     }, [])

//     return (
//         <>
//             <List />
//             <Chat />
//             <Detail />
//         </>
//     )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { UrlEndPoint } from '../../http/apiConfig'
import networkRequest from '../../http/api'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserAuth, setChats } from '../../redux/slice/commonSlice'
import { isEmpty } from 'lodash'
import NewGroupModal from '../../components/NewGroupModal';


const WhatsAppHomePage = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('auth_token');
    const { currentUser } = useSelector(state => state.common)

    const fetchChats = async () => {
        try {
            const url = UrlEndPoint.accessChat
            const res = await networkRequest({ url }, dispatch)
            dispatch(setChats(res.chats))
            // console.log('res.chats: ', res.chats);
        } catch (error) {
            console.error("fetchChats:", error.message)
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const url = UrlEndPoint.currentUser
            const res = await networkRequest({ url }, dispatch)
            dispatch(currentUserAuth(res.user))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!isEmpty(token) && isEmpty(currentUser)) {
            fetchCurrentUser()
            fetchChats();
        }
    }, [])

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <ChatArea />
            <NewGroupModal/>
        </div>
    );
};

export default WhatsAppHomePage;