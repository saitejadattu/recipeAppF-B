import React, { useState, useEffect } from 'react'
import "./index.css"
import NavBar from '../NavBar'
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateRecipe = () => {
    const [recipe, setRecipe] = useState({ title: '', category: '', ingredients: "", instructions: '', cooking_time: 0 })
    const jwtToken = Cookies.get("jwtToken")
    const userData = jwtDecode(jwtToken)

    const handlerecipe = (e) => {
        const { name, value } = e.target
        setRecipe((prevState) => ({ ...prevState, [name]: value }))
    }
    const { id } = useParams()
    const fetchRecipe = async () => {
        const response = await axios.get(`https://deploying-backend-10.onrender.com/recipe/get/${userData.id}/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        setRecipe(response.data.recipe)
    }
    useEffect(() => {
        fetchRecipe()
    }, []
)
    const handleForm = async (e) => {
        e.preventDefault()
        const response = await axios.put(`https://deploying-backend-10.onrender.com/recipe/put/${userData.id}/${id}`, recipe, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            }
        })
        toast(response.data.message)
    }
    return (
        <div className='add-container'>
            <NavBar />
            <div className='add-form-container'>
                <form onSubmit={handleForm} className='form-container'>
                    <ToastContainer/>
                    <h1 className='login-heading'>Add</h1>
                    <label htmlFor='title'>Title</label>
                    <input value={recipe.title} onChange={handlerecipe} type="text" placeholder="Enter recipe name" name="title" id='title' />
                    <br />
                    <label htmlFor='ingredients'>Ingredients</label>
                    <input value={recipe.ingredients} onChange={handlerecipe} type="text" placeholder="Enter recipe ingredients" name="ingredients" id='ingredients' />
                    <br />
                    <label htmlFor='instructions'>Instructions</label>
                    <input value={recipe.instructions} onChange={handlerecipe} type="text" placeholder="Enter recipe instructions" name="instructions" id='instructions' />
                    <br />
                    <label htmlFor='category'>Category</label>
                    <input value={recipe.category} onChange={handlerecipe} type="text" placeholder="Enter recipe name" name="category" id='category' />
                    <br />
                    <label htmlFor='cooking_time'>Cooking Time</label>
                    <input value={recipe.cooking_time} onChange={handlerecipe} type="number" placeholder="Enter recipe cooking time" name="cooking_time" id='cooking_time' />
                    <button className='button-add' type='submit'>add</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateRecipe
