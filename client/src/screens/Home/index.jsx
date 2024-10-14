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


// import React, { useState } from 'react';
// import ProfilePage from './ProfilePage';
// import ContactInfo from './contacts';
// import NewGroup from './NewGroup';
// import WhatsAppHomePage from './whatsAppHomePage';

// const App = () => {
//   const [selectedPage, setSelectedPage] = useState('home');

//   const contacts = [
//     { id: 1, name: 'John Doe', avatar: 'path_to_avatar', phone: '123-456-7890', lastSeen: '10:30 AM' },
//     { id: 2, name: 'Jane Doe', avatar: 'path_to_avatar', phone: '987-654-3210', lastSeen: '5:00 PM' },
//   ];

//   return (
//     <div className="app">
//       {/* Navigation Buttons */}
//       <div className="navigation">
//         <button onClick={() => setSelectedPage('profile')}>Profile</button>
//         <button onClick={() => setSelectedPage('contacts')}>Contact Info</button>
//         <button onClick={() => setSelectedPage('newGroup')}>New Group</button>
//         <button onClick={() => setSelectedPage('home')}>Home</button>
//       </div>

//       {/* Conditional Rendering for Components */}
//       {selectedPage === 'profile' && <ProfilePage />}
//       {selectedPage === 'contacts' && <ContactInfo contact={contacts[0]} />}
//       {selectedPage === 'newGroup' && <NewGroup contacts={contacts} />}
//       {selectedPage === 'home' && <WhatsAppHomePage />}
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WhatsAppHomePage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const contacts = [
    { id: 1, name: 'John Doe', avatar: 'path_to_avatar' },
    { id: 2, name: 'Jane Doe', avatar: 'path_to_avatar' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      setMessages([...messages, { type: 'outgoing', text: message, time: '10:33 AM' }]);
      setMessage('');
    }
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setMessages([]); // Clear previous messages when selecting a new contact
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-1/4 bg-gray-900 text-white flex flex-col h-full">
        
              <div className="p-4 border-b border-gray-700 flex justify-between items-center relative">
  <h1 className="text-lg font-semibold">WhatsApp</h1>
  <div className="flex space-x-4">
    <img
      src="path_to_avatar"
      alt="avatar"
      className="w-8 h-8 rounded-full object-cover"
    />
    <button
      className="p-1 rounded-full hover:bg-gray-700"
      onClick={toggleDropdown}
    >
      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        {/* Menu Icon */}
        <path d="..." />
      </svg>
    </button>

    {/* Dropdown Menu */}
              {/* {showDropdown && (
      <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg w-48 p-4">
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Settings</h2>
        <ul className="space-y-2">
          <li>
            <label className="text-sm text-gray-600">Change Username:</label>
            <input
              type="text"
              placeholder="Enter new username"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm mt-1"
            />
          </li>
          <li>
            <label className="text-sm text-gray-600">Change Avatar:</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm mt-1"
            />
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Notifications</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500" />
          </li>
          <li className="mt-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Save Changes
            </button>
          </li>
        </ul>
      </div>
    )} */}
   

{/* Dropdown Menu */}
{showDropdown && (
  <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg w-40 p-2 ">
        <ul className="space-y-2">
          <li>
            <Link to="/profile" className="text-blue-500 hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="text-blue-500 hover:underline">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/newgroup" className="text-blue-500 hover:underline">
              New Group
            </Link>
          </li>
          <li>
            <Link to="/home" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
    </ul>
  </div>
)}

            </div>
          </div>

          

          {/* Search Bar */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full p-2 bg-gray-800 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleSelectContact(contact)}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{contact.name}</h3>
                    <p className="text-gray-400 text-sm">Last message...</p>
                  </div>
                  <span className="text-gray-400 text-xs">10:30 AM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col h-full">
        <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {selectedContact ? (
              <>
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{selectedContact.name}</h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </>
            ) : (
              <p className="font-semibold text-lg text-gray-500">Select a contact to start chatting</p>
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
          <div className="bg-gray-100 p-4 flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-300">
              <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                {/* Emoji Icon */}
                <path d="..." />
              </svg>
            </button>
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
    </div>
  );
};

export default WhatsAppHomePage;