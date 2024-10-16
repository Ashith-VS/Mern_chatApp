import React from 'react';
import Modal from 'react-modal';
import avatarIcon from '../../assets/icons/avatar.png';
import arrowUpIcon from '../../assets/icons/arrowUp.png';
import arrowDownIcon from '../../assets/icons/arrowDown.png';
import downloadIcon from '../../assets/icons/download.png';
import { useDispatch, useSelector } from 'react-redux';
import { setIsContactModalOpen } from '../../redux/slice/commonSlice';

const ContactModal = () => {
    const dispatch = useDispatch();
    const { isContactModalOpen } = useSelector(state => state.common);

    return (
        <Modal
            isOpen={isContactModalOpen}
            onRequestClose={() => dispatch(setIsContactModalOpen(false))}
            style={{
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' }, // Dark background overlay
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '600px',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#000', // Black background for modal content
                    color: '#fff', // White text color
                },
            }}
        >
            <div className="relative">
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 text-white hover:text-gray-300 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                    onClick={() => dispatch(setIsContactModalOpen(false))}
                >
                    ✕ {/* Close icon */}
                </button>

                <div className="user flex flex-col items-center space-y-4 mb-6">
                    {/* Profile Picture Above Name */}
                    <img src={avatarIcon} alt="User Avatar" className="w-24 h-24 rounded-full" />
                    <h2 className="text-2xl font-semibold">User Name</h2>
                    <p className="text-gray-300 text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                </div>

                <div className="info space-y-6">
                    {/* Chat Settings Section */}
                    <div className="option">
                        <div className="title flex justify-between items-center">
                            <span className="font-semibold">Chat Settings</span>
                            <img src={arrowUpIcon} alt="Expand" className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Privacy & Help Section */}
                    <div className="option">
                        <div className="title flex justify-between items-center">
                            <span className="font-semibold">Privacy & Help</span>
                            <img src={arrowUpIcon} alt="Expand" className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Shared Photos Section */}
                    <div className="option">
                        <div className="title flex justify-between items-center">
                            <span className="font-semibold">Shared Photos</span>
                            <img src={arrowDownIcon} alt="Collapse" className="w-4 h-4" />
                        </div>
                        <div className="photos grid grid-cols-3 gap-2 mt-4">
                            {/* Repeated Photo Items */}
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="photoItem flex items-center justify-between space-x-2">
                                    <div className="photoDetail flex items-center space-x-2">
                                        <img
                                            src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600"
                                            alt="Shared"
                                            className="w-10 h-10 object-cover"
                                        />
                                        <span className="text-gray-300">photo_24.png</span>
                                    </div>
                                    <img src={downloadIcon} alt="Download" className="icon w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shared Files Section */}
                    <div className="option">
                        <div className="title flex justify-between items-center">
                            <span className="font-semibold">Shared Files</span>
                            <img src={arrowDownIcon} alt="Collapse" className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="actions mt-6 space-y-4">
                        <button className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                            Block User
                        </button>
                        <button className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ContactModal;
