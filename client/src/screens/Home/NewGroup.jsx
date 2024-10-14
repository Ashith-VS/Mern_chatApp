import React, { useState } from 'react';

const NewGroup = ({ contacts }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState('');

  const handleContactSelection = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleCreateGroup = () => {
    if (groupName && selectedContacts.length > 0) {
      // Create group logic here
      alert(`Group "${groupName}" created with ${selectedContacts.length} members.`);
    } else {
      alert('Please enter a group name and select at least one contact.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <div className="space-y-4 mb-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact)}
                onChange={() => handleContactSelection(contact)}
                className="mr-2"
              />
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2">{contact.name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleCreateGroup}
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default NewGroup;
