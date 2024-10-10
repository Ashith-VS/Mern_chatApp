import React, { useState } from 'react'
import avatarIcon from '../../../assets/icons/avatar.png'
import "./register.css"

const Register = () => {
    const [avatar, setAvatar] = useState({
        image: null,
        url: ""
    })
    console.log('avatar: ', avatar);

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
                    <label htmlFor="file"><img src={avatar?.url||avatarIcon} alt="" />Upload an Image</label>
                    <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name='username' />
                    <input type="text" placeholder="Email" name='email' />
                    <input type="password" placeholder="Password" name='password' />
                    <button type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Register