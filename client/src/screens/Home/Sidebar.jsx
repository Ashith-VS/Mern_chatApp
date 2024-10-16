import React, { useEffect, useState } from 'react'
import NewGrupIcon from '../../assets/icons/group.png'
import moreIcon from "../../assets/icons/more_icon.png"
import { Link, useNavigate } from 'react-router-dom';
import networkRequest from '../../http/api';
import { UrlEndPoint } from '../../http/apiConfig';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../constants/common';
import { setSelectedChat, setChats, setIsNewGroupModalOpen, setIsProfileModal, setIsContactModalOpen } from '../../redux/slice/commonSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, selectedChat, chats } = useSelector(state => state.common)
    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);


    useEffect(() => {
        if (chats?.length > 0) {
            const res = chats.map(chat => chat?.users.filter(user => user._id !== currentUser._id))

            setSearchResult(res.flat());
        }
    }, [chats, currentUser]);
    // console.log('currentUser: ', currentUser);


    const handleSelectContact = async (user) => {
        try {
            const url = UrlEndPoint.accessChat
            const res = await networkRequest({ url, method: 'POST', data: { chatId: user?._id } }, dispatch)
            // if (!chats.find((chat) => chat.id === res.chat._id))
            // dispatch(setChats([...chats,res?.chat,]))
            dispatch(setSelectedChat(user))

            // console.log('res444455: ', res);
        } catch (error) {
            console.error('error select chat:', error)
        }
    };

    const handleSearchChange = async (e) => {
        try {
            setSearch(e.target.value);
            if (isEmpty(e.target.value)) {
                setSearchResult([]);
                return;
            } else {
                const url = UrlEndPoint.search(e.target.value)
                const res = await networkRequest({ url }, dispatch)
                setSearchResult(res?.users || []);
            }
        } catch (error) {
            console.error('search fail:', error)
        }
    }


    return (
        <div className="w-1/4 bg-gray-500 text-white flex flex-col h-full">

            <div className="p-4 border-b border-gray-700 flex justify-between items-center relative">
                <h1 className="text-lg font-semibold cursor-pointer">ChatApp</h1>
                <div className="flex space-x-4">
                    <img
                        src={NewGrupIcon}
                        alt=""
                        onClick={() => dispatch(setIsNewGroupModalOpen(true))}
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    />
                    <img
                        src={moreIcon}
                        alt=""
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    />

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 bg-black shadow-lg rounded-lg w-40 p-2  ">
                            <ul className="space-y-2">
                                <li onClick={() => dispatch(setIsProfileModal(true))}>
                                    Profile
                                </li>
                                <li onClick={() => dispatch(setIsNewGroupModalOpen(true))}>
                                    New Group
                                </li>
                                <li onClick={() => handleLogout(navigate)}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Bar */}
            <div className="m-2 p-4">
                <input
                    type="text"
                    name='search'
                    value={search}
                    placeholder="Search or start new chat"
                    onChange={handleSearchChange}
                    className="w-full  bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 p-4 text-white"
                />
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
                {searchResult?.length > 0 ?
                    searchResult?.map((contact) => (
                        <div
                            key={contact._id}
                            className={`p-4 hover:bg-gray-900 cursor-pointer ${selectedChat?._id === contact?._id ? "bg-blue-500 text-white" : ""}`}
                            onClick={() => handleSelectContact(contact)}
                        >
                            <div className="flex items-center space-x-4 ">
                                <img
                                    src={contact?.avatar}
                                    alt=''
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold">{contact?.username}</h3>
                                    <p className="text-gray-400 text-sm">Last message...</p>
                                </div>
                                <span className="text-gray-400 text-xs">10:30 AM</span>
                            </div>
                        </div>
                    )) : "No contacts found"}
            </div>
            {/* New Group Modal */}

        </div>
    )
}

export default Sidebar