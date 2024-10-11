import React, { useState } from 'react'
import avatarIcon from '../../../assets/icons/avatar.png'
import "./register.css"
import axios from 'axios'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import networkRequest from '../../../http/api'
import { UrlEndPoint } from '../../../http/apiConfig'
import { useNavigate } from 'react-router-dom'

const Register = () => {
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
                const res = await networkRequest({ url, method: 'POST', data: formData })
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
        <div className="register">
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file"><img src={formData?.url || avatarIcon} alt="" />Upload an Image</label>
                    <input type="file" id='file' accept='image/*' style={{ display: 'none' }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name='username' value={formData.username} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{error && error?.username}</p>
                    <input type="text" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{error && error?.email}</p>
                    <div className="password-container">
                        <input type={showPassword.password ? "text" : "password"} placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                        <span type="button" className="toggle-btn" onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}>{showPassword.password ? "Hide" : "Show"}</span>
                    </div>
                    <p style={{ color: 'red' }}>{error && error?.password}</p>
                    <div className="password-container">
                        <input type={showPassword.confirmPassword ? "text" : "password"} placeholder="Confirm Password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                        <span type="button" className="toggle-btn" onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>{showPassword.confirmPassword ? "Hide" : "Show"}</span>
                    </div>
                    <p style={{ color: 'red' }}>{error && error?.confirmPassword}</p>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register