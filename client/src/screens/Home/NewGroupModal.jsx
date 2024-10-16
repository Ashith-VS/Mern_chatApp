import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewGroupModalOpen } from '../../redux/slice/commonSlice';


const NewGroupModal = () => {
    const dispatch = useDispatch();
    const { isNewGroupModalOpen } = useSelector(state => state.common);

    // Handle group creation (mock for now)
    const handleCreateGroup = () => {
        // Logic to create the group
        console.log("Group Created");
        dispatch(setIsNewGroupModalOpen(false));
    };

    return (
        <Modal
            isOpen={isNewGroupModalOpen}
            onRequestClose={() => dispatch(setIsNewGroupModalOpen(false))}
            style={{
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '400px',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <div className="relative">
                {/* Close button in the top-right corner */}
                <button
                    className="absolute top-2 right-2 text-black hover:text-gray-800 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={() => dispatch(setIsNewGroupModalOpen(false))}
                >
                    ✕ {/* Close icon */}
                </button>

                {/* Modal content */}
                <h2 className="text-2xl font-semibold text-center mb-6">Create New Group</h2>
                <input
                    type="text"
                    placeholder="Group Name"
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Add logic for contact selection and other fields here */}

                <button
                    onClick={handleCreateGroup}
                    className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                    Create Group
                </button>

                <button
                    onClick={() => dispatch(setIsNewGroupModalOpen(false))}
                    className="mt-4 w-full text-gray-500 hover:underline text-center"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default NewGroupModal;
