import React, { useState } from 'react'
import avatarIcon from '../../../assets/icons/avatar.png'
import "./register.css"

const Register = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    })
    const [avatar, setAvatar] = useState({
        image: null,
        url: ""
    })

    const handleAvatar = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAvatar({ image: file, url: URL.createObjectURL(file) })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="register">
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file"><img src={avatar?.url || avatarIcon} alt="" />Upload an Image</label>
                    <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name='username' />
                    <input type="text" placeholder="Email" name='email' />
                    <div className="password-container">
                    <input type={showPassword.password ?"text":"password"} placeholder="Password" name='password' />
                    <span type="button" className="toggle-btn" onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}>{showPassword.password  ? "Hide" : "Show"}</span>
                    </div>
                    <div className="password-container">
                    <input type={showPassword.confirmPassword?"text":"password"} placeholder="Conform Password" name='Conformpassword' />
                    <span type="button" className="toggle-btn" onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>{showPassword.confirmPassword ? "Hide" : "Show"}</span>
                    </div>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register