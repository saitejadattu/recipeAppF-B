import React from 'react'
import Cookies from "js-cookie"
import "./index.css"
import { useNavigate } from "react-router-dom"
const NavBar = (props) => {
    const navigate = useNavigate()
    const handleLogOut = () => {
        Cookies.remove("jwtToken")
        navigate("/")
    }
    const handleHome = () =>{
        navigate("/home")
    }
    return (
        <div className='nav-container'>
            <button onClick={handleHome} className='home-button'>My recipes</button>
            <button value="signup" className='submit-button' onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default NavBar
