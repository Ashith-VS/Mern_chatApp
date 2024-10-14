import React, { useState } from 'react';
import Modal from 'react-modal';
const ProfileModal = () => {
  const [editing, setEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: 'John Doe',
    status: 'Hey there! I am using WhatsApp.',
    avatar: 'path_to_avatar_image',
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setEditing(false);
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal style={customStyles}>

    </Modal>
    // <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
    //   <div className="bg-white p-8 rounded-md shadow-md w-96">
    //     <div className="flex justify-center mb-4">
    //       <img
    //         src={profileInfo.avatar}
    //         alt="Profile Avatar"
    //         className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
    //       />
    //     </div>
        
    //     {editing ? (
    //       <form onSubmit={handleProfileUpdate}>
    //         <input
    //           type="text"
    //           value={profileInfo.name}
    //           onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
    //           className="w-full p-2 mb-4 border rounded-md"
    //         />
    //         <input
    //           type="text"
    //           value={profileInfo.status}
    //           onChange={(e) => setProfileInfo({ ...profileInfo, status: e.target.value })}
    //           className="w-full p-2 mb-4 border rounded-md"
    //         />
    //         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
    //           Save Changes
    //         </button>
    //       </form>
    //     ) : (
    //       <>
    //         <h2 className="text-xl font-semibold mb-2">{profileInfo.name}</h2>
    //         <p className="text-gray-500 mb-4">{profileInfo.status}</p>
    //         <button
    //           className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md w-full"
    //           onClick={() => setEditing(true)}
    //         >
    //           Edit Profile
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
};

export default ProfileModal;
