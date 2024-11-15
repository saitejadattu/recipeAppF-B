import React from 'react'
import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
const Login = () => {
    const [userDetails, setUserDetails] = useState({ "email": '', "password": '' })
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handleInput = (e) => {
        const { name, value } = e.target
        setUserDetails((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleForm = async (e) => {
        e.preventDefault()
        const loginRequest = await axios.post("https://deploying-backend-10.onrender.com/user/login", userDetails)
        console.log(loginRequest)
        const { jwtToken, message, status } = loginRequest.data
        if (status === "success") {
            Cookies.set("jwtToken", jwtToken)
            toast(message)
            setTimeout(() => {
                navigate("/home")
            }, 2500)
        } else {
            toast(message)
        }
        setUserDetails({ "email": '', "password": '' })
    }
    return (
        <div className='login-container'>
            <form onSubmit={handleForm} className='login-form-container'>
                <ToastContainer />
                <h1 className='login-heading'>Login</h1>
                <br />
                <label htmlFor='email'>Email</label>
                <br />
                <input value={userDetails.email} placeholder='Enter Email' onChange={handleInput} name="email" id='email' type="email" required />
                <br />
                <br />
                <label htmlFor='password'>Password</label>
                <br />
                <input value={userDetails.password} placeholder='Enter Password' onChange={handleInput} name="password" id='password' type="password" required />
                <br />
                <p>New to recipe platform? <Link to='/signup'>signup</Link></p>
                <button className='submit-button' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
