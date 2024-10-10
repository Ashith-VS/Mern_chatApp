import React, { useState } from 'react'
import "./login.css"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.error("hello!");
    }

  return (
    <div className="login">
        <div className="item">
            <h2>Welcome back</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" />
                <div className="password-container">
                <input type={showPassword?"text":"password"} placeholder="Password" />
                <span type="button" className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
                </div>
                <button type="submit">Sign In</button>
            </form>
            <p>Don't have an account? <Link to='/register' style={{textDecoration:'none',color:'inherit'}}>Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login