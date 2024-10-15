import React from 'react'
import { setIsNewGroupModalOpen } from '../redux/slice/commonSlice'
import { useDispatch, useSelector } from 'react-redux'


const NewGroupModal = () => {
  const dispatch = useDispatch()
  const { isNewGroupModalOpen } = useSelector(state => state.common)
  return (
    <>
    {isNewGroupModalOpen &&
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Create New Group</h2>
                        <input
                            type="text"
                            placeholder="Group Name"
                            className="w-full p-2 mb-4 border rounded-md"
                        />
                        {/* Add logic for contact selection and other fields */}

                        <button
                            // onClick={() => setIsNewGroupModalOpen(false)}
                            className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
                        >
                            Create Group
                        </button>

                        <button
                            onClick={() => dispatch(setIsNewGroupModalOpen(false))}
                            className="mt-4 text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>}
                </>
  )
}

export default NewGroupModal