import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify';
import networkRequest from '../../http/api';
import { UrlEndPoint } from '../../http/apiConfig';
import bgImage from "../../assets/icons/bg.jpg"
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = handleValidation()
        if (!isEmpty(valid)) {
            setError(valid)
        } else {
            try {
                const url = UrlEndPoint.login
                const res = await networkRequest({ url, method: 'POST', data: formData },dispatch)
                if (res.status === 200) {
                    toast.success("Successfully logged in");
                    localStorage.setItem('auth_token', res.token)
                    navigate('/')
                } else {
                    toast.error(res.message || "Login failed")
                    setFormData({ email: '', password: '' })
                }
            } catch (error) {
                console.error('error:', error)
                toast.error(error.message || "Login failed")
                setFormData({ email: '', password: '' })
            }
        }
    }

    const handleValidation = () => {
        let error = {}
        const { email, password } = formData;
        if (!email) {
            error.email = "Email is required"
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            error.email = "Invalid email"
        }
        if (!password) {
            error.password = "Password is required"
        }
        return error
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
        setError({ ...error, [e.target.name]: "" })
    }

    return (
        <div className='flex justify-center items-center h-screen bg-cover' style={{ background: `url(${bgImage})`, objectFit: "cover" }} >
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className='text-4xl text-white font-bold text-center mb-6'>Welcome back</h1>
                <form onSubmit={handleSubmit}>
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
                        {/* Email Error */}
                        {error?.email && <p className='mt-2 text-xs text-red-500'>{error.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="relative my-4 flex items-center w-72">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='block w-full py-2.3 text-sm text-white placeholder-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
                        />
                        {/* Show/Hide Password Button */}
                        <span
                            type="button"
                            className="text-sm text-blue-200 cursor-pointer ml-2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>

                    {/* Password Error */}
                    {error?.password && <p className='mt-2 text-xs text-red-500'>{error.password}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 mt-4 transition-colors duration-200 ease-in-out w-full"
                    >
                        Sign In
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-white mt-4">
                    Don't have an account? <Link to='/register' className="text-blue-700 hover:text-blue-500">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login