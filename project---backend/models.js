const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cooking_time: {
        type: Number,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
}, { timestamps: true })
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    recipesList: [recipeSchema]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = { User}