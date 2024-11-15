import axios from "axios"
import { useState } from "react"
import { useNavigate,Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
const Signup = () => {
    const [userDetails, setUserDetails] = useState({ "username": '', "email": '', "password": '' })
    const navigate = useNavigate()
    const handleInput = (e) => {
        const { name, value } = e.target
        setUserDetails((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleForm = async (e) => {
        e.preventDefault()
        const signUpRequest = await axios.post("https://deploying-backend-10.onrender.com/user/signup", userDetails)
        const { message } = signUpRequest.data
        setUserDetails({ "username": '', "email": '', "password": '' })
        if (signUpRequest.status === 200) {
            console.log(message)
            toast(message)
        } else {
            toast(message)
        }
    }
    return (
        <div className='login-container'>
            <form onSubmit={handleForm} className='login-form-container'>
                <ToastContainer />
                <h1 className="login-heading">SignUp</h1>
                <br />
                <label htmlFor='username'>User Name</label>
                <br />
                <input value={userDetails.username} placeholder='Enter Name' onChange={handleInput} name="username" id='username' type="text" required />
                <br />
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
                <p>Already have an account? <Link to='/'>Login</Link></p>
                <button type="submit" className="submit-button">SignUp</button>
            </form>
        </div>
    )
}

export default Signup
