import React from 'react';

const ContactInfo = ({ contact }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex justify-center mb-4">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">{contact.name}</h2>
        <p className="text-gray-500 mb-2">Phone: {contact.phone}</p>
        <p className="text-gray-500 mb-2">Last seen: {contact.lastSeen}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Start Chat
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md">
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
