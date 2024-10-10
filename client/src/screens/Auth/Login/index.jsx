import React from 'react'
import "./login.css"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
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
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            <p>Don't have an account? <Link to='/register' style={{textDecoration:'none',color:'inherit'}}>Sign In</Link></p>
        </div>
    </div>
  )
}

export default Login