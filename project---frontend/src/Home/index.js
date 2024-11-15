import React from 'react'
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios'
import NavBar from '../NavBar'
import "./index.css"
import { toast, ToastContainer } from 'react-toastify'
const Home = () => {
    const [recipes, setRecipes] = useState([])
    const jwtToken = Cookies.get("jwtToken")
    const navigate = useNavigate()
    const userData = jwtDecode(jwtToken)
    const { id } = userData
    const fetchData = async () => {
        const response = await axios.get(`https://deploying-backend-10.onrender.com/recipe/get/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        if (response.status === 200) {
            const { recipesList } = response.data
            setRecipes(recipesList)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleAdd = () => {
        navigate("/add")
    }
    const handleUpdate = (recipeId) => {
        navigate(`/update/${recipeId}`)
    }
    const handleDelete = async (id) => {
        const response = await axios.delete(`https://deploying-backend-10.onrender.com/recipe/delete/${userData.id}/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        // console.log(response)
        toast(response.data.message)
        fetchData()
    }
    return (
        <div className='home-container'>
            <NavBar />
            <div className='recipes-container' >
                <button onClick={handleAdd} className='api-button'>Add New Recipe</button>
                <ToastContainer/>
                <ul className='unorder-recipe-list' >
                    {recipes?.map((each) => <li key={each._id} className='recipe-list-item'>
                        <p><span>Recipe name:</span> {each.title}</p>
                        <p><span>Category:</span> {each.category}</p>
                        <p><span>Ingredients:</span> {(each.ingredients).join(", ")}</p>
                        <p><span>Instructions:</span> {each.instructions}</p>
                        <p><span>Cookig time:</span> {each.cooking_time}</p>
                        <div className='buttons-container'>
                            <button onClick={() => handleUpdate(each._id)} className='api-button'>update</button>
                            <button onClick={() => handleDelete(each._id)} className='api-button'>delete</button>
                        </div>
                    </li>)}
                </ul>
            </div>
        </div >
    )
}

export default Home
