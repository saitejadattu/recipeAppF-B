import React, { useState } from 'react'
import "./index.css"
import NavBar from '../NavBar'
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddRecipe = () => {
    const [recipe, setRecipe] = useState({ title: '', category: '', ingredients: "", instructions: '', cooking_time: 0 })
    const [instructions, setInstructions] = useState([])
    const jwtToken = Cookies.get("jwtToken")
    const userData = jwtDecode(jwtToken)
    const { id } = userData
    const handlerecipe = (e) => {
        const { name, value } = e.target
        setRecipe((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleForm = async (e) => {
        e.preventDefault()
        recipe["ingredients"] = await (recipe.ingredients).split(',').map(item => item.trim())
        const response = await axios.post(`https://deploying-backend-10.onrender.com/recipe/post/${id}`, recipe, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            }
        })
        console.log(response)
        toast(response.data.message)
        setRecipe({ title: '', category: '', ingredients: "", instructions: '', cooking_time: 0 })
    }
    return (
        <div className='add-container'>
            <NavBar />
            <div className='add-form-container'>
                <form onSubmit={handleForm} className='form-container'>
                    <ToastContainer/>
                    <h1 className='login-heading'>Add</h1>
                    <label htmlFor='title'>Title</label>
                    <input value={recipe.title} onChange={handlerecipe} type="text" placeholder="Enter recipe name" name="title" id='title' required />
                    <br />
                    <label htmlFor='ingredients'>Ingredients</label>
                    <input value={recipe.ingredients} onChange={handlerecipe} type="text" placeholder="Enter recipe ingredients" name="ingredients" id='ingredients' required />
                    <br />
                    <label htmlFor='instructions'>Instructions</label>
                    <input value={recipe.instructions} onChange={handlerecipe} type="text" placeholder="Enter recipe instructions" name="instructions" id='instructions' required />
                    <br />
                    <label htmlFor='category'>Category</label>
                    <input value={recipe.category} onChange={handlerecipe} type="text" placeholder="Enter recipe name" name="category" id='category' required />
                    <br />
                    <label htmlFor='cooking_time'>Cooking Time</label>
                    <input value={recipe.cooking_time} onChange={handlerecipe} type="number" placeholder="Enter recipe cooking time" name="cooking_time" id='cooking_time' required />
                    <button className='button-add' type='submit'>add</button>
                </form>
            </div>
        </div>
    )
}

export default AddRecipe
