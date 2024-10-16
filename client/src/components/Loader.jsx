import React from 'react'
import { useSelector } from 'react-redux'


const Loader = () => {
    const { loading } = useSelector(state => state.common)
  
    return (
        <>
            {loading &&
                <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 ">
                    <div className="loader border-t-transparent border-solid border-4 border-blue-600 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            }
        </>
    )
}

export default Loader
