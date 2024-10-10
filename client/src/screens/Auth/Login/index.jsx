import React, { useState } from 'react'
import "./login.css"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const[formData,setFormData] = useState({
        email: "",
        password: ""
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formData: ', formData);
        toast.success("Successfully logged in");
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

  return (
    <div className="login">
        <div className="item">
            <h2>Welcome back</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
                <div className="password-container">
                <input type={showPassword?"text":"password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
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