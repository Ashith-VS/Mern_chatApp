import React, { useState } from 'react'
import avatarIcon from '../../../assets/icons/avatar.png'
import "./register.css"
import axios from 'axios'

const Register = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formData: ', formData);
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
    }

    return (
        <div className="register">
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file"><img src={formData?.url || avatarIcon} alt="" />Upload an Image</label>
                    <input type="file" id='file' accept='image/*' style={{ display: 'none' }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name='username' value={formData.username} onChange={handleChange} />
                    <input type="text" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                    <div className="password-container">
                        <input type={showPassword.password ? "text" : "password"} placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                        <span type="button" className="toggle-btn" onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}>{showPassword.password ? "Hide" : "Show"}</span>
                    </div>
                    <div className="password-container">
                        <input type={showPassword.confirmPassword ? "text" : "password"} placeholder="Confirm Password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                        <span type="button" className="toggle-btn" onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>{showPassword.confirmPassword ? "Hide" : "Show"}</span>
                    </div>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register