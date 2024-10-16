import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileModal } from '../../redux/slice/commonSlice';

const ProfileModal = () => {
    const dispatch = useDispatch();
    const { isProfileModal } = useSelector((state) => state.common);

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

    return (
        <Modal
            isOpen={isProfileModal}
            onRequestClose={() => {
                dispatch(setIsProfileModal(false));
                console.log("Modal close requested");
            }}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            // style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
            className="flex justify-center items-center h-full"

        >
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-black hover:text-gray-800 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={() => {
                        dispatch(setIsProfileModal(false));
                        console.log("Modal close button clicked");
                    }}
                >
                    ✕ {/* Close Icon (Cross) */}
                </button>

                <div className="flex justify-center mb-4">
                    <img
                        src={profileInfo.avatar}
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                    />
                </div>
                {editing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <input
                            type="text"
                            value={profileInfo.name}
                            onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                        <input
                            type="text"
                            value={profileInfo.status}
                            onChange={(e) => setProfileInfo({ ...profileInfo, status: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your status"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold text-center mb-2">{profileInfo.name}</h2>
                        <p className="text-gray-500 text-center mb-6">{profileInfo.status}</p>
                        <button
                            className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition duration-300"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default ProfileModal;
