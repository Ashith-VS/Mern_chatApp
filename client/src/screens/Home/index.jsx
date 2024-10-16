import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { UrlEndPoint } from '../../http/apiConfig'
import networkRequest from '../../http/api'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserAuth, setChats } from '../../redux/slice/commonSlice'
import { isEmpty } from 'lodash'
import NewGroupModal from './NewGroupModal';
import ProfileModal from './ProfileModal';
import Modal from 'react-modal';
import ContactModal from './ContactModal';
Modal.setAppElement('#root');


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
            <NewGroupModal />
            <ProfileModal />
            <ContactModal />
        </div>
    );
};

export default WhatsAppHomePage;