import React, { useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify';
import networkRequest from '../../../http/api';
import { UrlEndPoint } from '../../../http/apiConfig';

const Login = () => {
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
                const res = await networkRequest({ url, method: 'POST', data: formData })
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
                toast.error(error.message|| "Login failed")
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
        <div className="login">
            <div className="item">
                <h2>Welcome back</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{error && error?.email}</p>
                    <div className="password-container">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                        <span type="button" className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
                    </div>
                    <span style={{ color: 'red' }}>{error && error?.password}</span>
                    <button type="submit">Sign In</button>
                </form>
                <p>Don't have an account? <Link to='/register' style={{ textDecoration: 'none', color: 'inherit' }}>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login