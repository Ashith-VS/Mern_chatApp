import React, { useEffect, useState } from 'react'
import AvatarIcon from "../../assets/icons/avatar.png"
import arrowDownIcon from '../../assets/icons/arrowDown.png'
import emojiIcon from '../../assets/icons/emoji.png'
import moment from 'moment';
import EmojiPicker from 'emoji-picker-react';
import { handleLogout } from '../../constants/common';
import { useNavigate } from 'react-router-dom';
import networkRequest from '../../http/api';
import { UrlEndPoint } from '../../http/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';


const ChatArea = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser,chats,selectedChat } = useSelector((state) => state.common);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);


    // useEffect(() => {
    //     if (chats?.length > 0) {
    //         // const res = chats.find(chat => console.log("554",chat))
    //         // console.log('res: ', res);
    //         // setUserContact(res.flat());
    //     }
    // }, [chats, currentUser]);


    const fetchAllMessages = async () => {
        if (!selectedChat) return
        try {
            // const url = UrlEndPoint.fetchMessage(selectedContact?._id)
            const url = UrlEndPoint.fetchMessage("670cf7517db86d0d7bc54d7a")
            const res = await networkRequest({ url }, dispatch)
            // console.log('res: ', res.messages);
            setMessage(res.messages)
        } catch (error) {
            console.error("Error fetch messages:", error);
        }
    }

    useEffect(() => {
        fetchAllMessages()
    }, [selectedChat])


    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            const url = UrlEndPoint.sendMessage
            const data = {
                chatId: selectedChat._id,
                content: newMessage
            }
            setNewMessage('')
            const res = await networkRequest({ url, method: 'post', data }, dispatch)
            // console.log('res: ', res);
            setMessage([...message, res.message])
        } catch (error) {
            console.error("Error sending messages:", error);
        }
    };

    const handleEmojiClick = (e) => {
        setNewMessage((prev) => prev + e.emoji)
        setEmojiOpen(false);
    }

    return (
        <div className="w-3/4 flex flex-col h-full">
            <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200">
                <div className={`flex items-center space-x-4  w-full ${!isEmpty(selectedChat) ? '' : 'justify-between'}`}>
                    {!isEmpty(selectedChat) ? (
                        <>
                            <img
                                src={selectedChat.avatar}
                                alt=''
                                className="w-10 h-10 rounded-full object-cover  cursor-pointer"
                            />
                            <div>
                                <h3 className="font-semibold  cursor-pointer">{selectedChat?.username}</h3>
                                <p className="text-xs text-gray-500  cursor-pointer">{selectedChat?.onlineStatus === true ? 'online' : 'offline'}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold text-lg text-gray-500">Select a contact to start chatting</p>
                            <div className='p-3 flex rounded-full items-center justify-end  bg-gray-300  space-x-2 relative '>
                                <img
                                    src={AvatarIcon}
                                    alt=''
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <img
                                    src={arrowDownIcon}
                                    alt=''
                                    className="w-5 h-5 rounded-full object-cover cursor-pointer"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                />
                            </div>
                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute top-14 right-0 bg-white shadow-md rounded-lg w-32 p-2">
                                    <ul>
                                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Profile</li>
                                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => handleLogout(navigate)}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>


            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
                {selectedChat && message?.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg text-gray-400">Say hello to your new chat!</p>
                    </div>
                ) : (
                    message.map((msg, idx) => {
                        const isSameSender = msg.sender._id === currentUser?._id;


                        // console.log('currentUser?._id: ', currentUser._id);
                        // console.log(' msg.sender._id: ',  msg.sender._id);
                        // console.log('isSameSender: ', isSameSender);
                        //   console.log('msg: ', msg)
                        const isLastMessageBySameSender = idx === message.length - 1 || message[idx + 1]?.sender._id !== msg.sender._id;

                        return (
                            <div key={msg._id} className={`flex mb-4 ${isSameSender ? 'justify-end' : 'justify-start'}`}>
                                {/* Incoming Message - Contact's Avatar */}
                                {!isSameSender && isLastMessageBySameSender && (
                                    <img
                                        src={selectedChat.avatar || "path_to_contact_image"}
                                        alt="Contact"
                                        className="w-8 h-8 rounded-full object-cover mr-2"
                                    />
                                )}

                                <div className={`max-w-xs p-3 rounded-lg shadow-md ${isSameSender ? 'bg-gray-500 text-white rounded-br-none' : 'bg-blue-200 text-black rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.content}</p>
                                    <span className="text-xs text-gray-400 block text-right mt-1">
                                        {moment(msg.createdAt).format('hh:mm A')}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>



            {/* Input Box */}
            {selectedChat && (
                <div className="bg-gray-100 p-4 flex items-center space-x-4 relative">
                    <div className="relative">
                        <button className="p-2 rounded-full hover:bg-gray-300">
                            <img src={emojiIcon} alt="" onClick={() => setEmojiOpen(!emojiOpen)} />
                        </button>
                        <div className="absolute bottom-full mb-2">
                            <EmojiPicker open={emojiOpen} onEmojiClick={handleEmojiClick} />
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200 ease-in-out"
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    )
}

export default ChatArea