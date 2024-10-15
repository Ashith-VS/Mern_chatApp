import React, { useState } from 'react'
import avatarIcon from '../../assets/icons/avatar.png'
import axios from 'axios'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import networkRequest from '../../http/api'
import { UrlEndPoint } from '../../http/apiConfig'
import { Link, useNavigate } from 'react-router-dom'
import bgImage from "../../assets/icons/bg.jpg"
import { useDispatch } from 'react-redux'

const Register = () => {
    const dispatch =useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    })

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        // image: null,
        url: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = handleValidation()
        if (!isEmpty(valid)) {
            setError(valid)
        } else {
            try {
                const url = UrlEndPoint.register
                const res = await networkRequest({ url, method: 'POST', data: formData },dispatch)
                if (res.status === 200) {
                    toast.success("Successfully registered.")
                    navigate('/login')
                } else {
                    toast.error("Failed to register.")
                }
            } catch (error) {
                console.error("Error", error)
                toast.error(error.message || "Failed to register.")
            }
        }

    }

    const handleValidation = (e) => {
        const errors = {}
        if (!formData.username) errors.username = 'Username is required'
        if (!formData.email) errors.email = 'Email is required'
        if (!formData.password) errors.password = 'Password is required'
        else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters'
        if (!formData.confirmPassword) errors.confirmPassword = 'Password is required'
        else if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required'
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match'
        return errors
    }

    const handleAvatar = async (e) => {
        const file = e.target.files[0]
        if (file) {
            // setFormData({...formData, image: file, url: URL.createObjectURL(file) })
            const data = new FormData()
            data.append('file', file)
            data.append('upload_preset', 'chatApp')
            data.append('cloud_name', 'dkfdbaey4')
            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/dkfdbaey4/image/upload', data)
                setFormData({ ...formData, url: res.data.secure_url });
            } catch (error) {
                console.error('Error uploading image: ', error)
            }
        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: '' })
    }

    return (
         <div className='flex justify-center items-center h-screen bg-cover' style={{background:`url(${bgImage})`,objectFit: "cover"}} >
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
    <h1 className='text-4xl text-white font-bold text-center mb-6'>Create an Account</h1>
    <form onSubmit={handleSubmit}>

        {/* Avatar Upload */}
        <div className="relative my-4 flex justify-center items-center">
            <label htmlFor="file" className="flex flex-col items-center cursor-pointer">
                <img
                    src={formData?.url || avatarIcon}
                    alt="Upload Avatar"
                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover mb-4"
                />
                <span className="text-white text-sm">Upload an Image</span>
            </label>
            <input type="file" id="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
        </div>

        {/* Username Input */}
        <div className='relative my-4'>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className='block w-72 py-2.3 text-sm text-white placeholder-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            />
            {error?.username && <p className='mt-2 text-xs text-red-500'>{error.username}</p>}
        </div>

        {/* Email Input */}
        <div className='relative my-4'>
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='block w-72 py-2.3 text-sm text-white placeholder-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            />
            {error?.email && <p className='mt-2 text-xs text-red-500'>{error.email}</p>}
        </div>

        {/* Password Input */}
        <div className="relative my-4 flex items-center w-72">
            <input
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className='block w-full py-2.3 text-sm text-white placeholder-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            />
            <span
                className="text-sm text-blue-200 cursor-pointer ml-2"
                onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}
            >
                {showPassword.password ? "Hide" : "Show"}
            </span>
        </div>
        {error?.password && <p className='mt-2 text-xs text-red-500'>{error.password}</p>}

        {/* Confirm Password Input */}
        <div className="relative my-4 flex items-center w-72">
            <input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className='block w-full py-2.3 text-sm text-white placeholder-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            />
            <span
                className="text-sm text-blue-200 cursor-pointer ml-2"
                onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
            >
                {showPassword.confirmPassword ? "Hide" : "Show"}
            </span>
        </div>
        {error?.confirmPassword && <p className='mt-2 text-xs text-red-500'>{error.confirmPassword}</p>}

        {/* Submit Button */}
        <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 mt-4 transition-colors duration-200 ease-in-out w-full"
        >
            Sign Up
        </button>
    </form>

    {/* Sign In Link */}
    <p className="text-white mt-4">
        Already have an account? <Link to='/login' className="text-blue-700 hover:text-blue-500">Sign In</Link>
    </p>
</div>
</div> 
    )
}

export default Register