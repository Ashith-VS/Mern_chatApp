import React, { useState } from 'react'
import AvatarIcon from "../../assets/icons/avatar.png"
import arrowDownIcon from '../../assets/icons/arrowDown.png'
import emojiIcon from '../../assets/icons/emoji.png'

import EmojiPicker from 'emoji-picker-react';
import { handleLogout } from '../../constants/common';
import { useNavigate } from 'react-router-dom';

const ChatArea = ({ setMessages, messages, selectedContact }) => {
    const navigate= useNavigate()
    const [message, setMessage] = useState('');
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);


    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message) {
            setMessages([...messages, { type: 'outgoing', text: message, time: '10:33 AM' }]);
            setMessage('');
        }
    };

    const handleEmojiClick = (e) => {
        setMessage((prev) => prev + e.emoji)
        setEmojiOpen(false);
    }

    return (
        <div className="w-3/4 flex flex-col h-full">
            <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200">
                <div className={`flex items-center space-x-4  w-full ${selectedContact ? '' : 'justify-between'}`}>
                    {selectedContact ? (
                        <>
                            <img
                                src={selectedContact.avatar}
                                alt=''
                                className="w-10 h-10 rounded-full object-cover  cursor-pointer"
                            />
                            <div>
                                <h3 className="font-semibold  cursor-pointer">{selectedContact?.username}</h3>
                                <p className="text-xs text-gray-500  cursor-pointer">{selectedContact?.onlineStatus === true ? 'online' : 'offline'}</p>
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
                                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={()=>handleLogout(navigate)}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
                {selectedContact && messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg text-gray-400">Say hello to your new chat!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.type === 'outgoing' ? 'justify-end' : ''} items-end space-x-2 mb-4`}>
                            {msg.type === 'incoming' && (
                                <img src="path_to_contact_image" alt="Contact" className="w-8 h-8 rounded-full object-cover" />
                            )}
                            <div className={`p-4 rounded-lg ${msg.type === 'incoming' ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Input Box */}
            {selectedContact && (
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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