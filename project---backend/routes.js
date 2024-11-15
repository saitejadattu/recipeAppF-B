const express = require("express")
const Router = express.Router()
const { User } = require("./models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Authorization = async (req, res, next) => {
    let jwtToken
    try {
        const { authorization } = req["headers"]
        if (authorization) {
            jwtToken = authorization.split(" ")[1]
            await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (error, payload) => {
                if (error) {
                    res.status(400).json({
                        status: "failure",
                        message: error.message
                    })
                } else {
                    req.payload = payload.id
                    next()
                }
            })
        } else {
            res.status(400).json({
                status: "failure",
                message: "Invalid jwt Token"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
}

Router.get("/", async (req, res) => {
    const userList = await User.find()
    res.status(200).json({
        userList
    })
})
Router.post("/signup", async (req, res) => {
    try {
        const user = req.body
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const isUser = await User.findOne({ email: user.email })
        if (!isUser) {
            const addUser = await User({ ...user, password: hashedPassword })
            await addUser.save()
            res.status(200).json({
                status: "success",
                message: "signup successful"
            })
        } else {
            res.status(201).json({
                status: "failure",
                message: "email already exist"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        })
    }
})

Router.post("/login", async (req, res) => {
    try {
        const user = req.body
        const isUser = await User.findOne({ email: user.email })
        if (isUser) {
            const isPassValid = await bcrypt.compare(user.password, isUser.password)
            // console.log(isPassValid)
            if (isPassValid) {
                const payload = { id: isUser.id }
                // console.log(payload)
                const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET_KEY)
                res.status(200).json({
                    status: "success",
                    message: "login successful",
                    jwtToken
                })
            } else {
                res.send({
                    status: "failure",
                    message: "email/password are incorrect"
                })
            }
        } else {
            res.status(400).json({
                status: "failure",
                message: "email not exists please register first"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})
Router.get("/get/:userId", Authorization, async (req, res) => {
    try {
        const { userId } = req.params
        const isUser = await User.findById(userId)
        if (isUser) {
            const recipesList = isUser.recipesList
            res.status(200).json({
                status: "success",
                recipesList
            })
        } else {
            res.send({
                status: "failure",
                message: "User Not found!"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        })
    }
})
Router.get("/get/:userId/:recipeId", Authorization, async (req, res) => {
    try {
        const { userId,recipeId } = req.params
        const isUser = await User.findById(userId)
        if (isUser) {
            const recipe = isUser.recipesList.find((each)=>each.id===recipeId)
            res.status(200).json({
                status: "success",
                recipe: recipe
            })
        } else {
            res.send({
                status: "failure",
                message: "User Not found!"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        })
    }
})
Router.post("/post/:userId", Authorization, async (req, res) => {
    try {
        const { userId } = req.params
        const recipe_data = req.body
        const isUser = await User.findById(userId)
        if (isUser) {
            const addTask = await User.findByIdAndUpdate(userId,
                { $push: { "recipesList": recipe_data } },
                { runValidators: true },
                { new: true },
            )
            res.status(200).json({
                status: "success",
                message: "recipe added successfully"
            })
        } else {
            res.status(400).json({
                status: "failure",
                message: "User Not found!"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

Router.put("/put/:userId/:recipeId", Authorization, async (req, res) => {
    try {
        const { userId, recipeId } = req.params
        const { title, category, cooking_time, ingredients, instructions } = req.body
        const isUser = await User.findById(userId)
        if (isUser) {
            const updateRecipe = await User.updateOne({ "_id": userId, "recipesList._id": recipeId },
                {
                    $set: {
                        "recipesList.$.title": title,
                        "recipesList.$.category": category,
                        "recipesList.$.cooking_time": cooking_time,
                        "recipesList.$.ingredients": ingredients,
                        "recipesList.$.instructions": instructions,
                    }
                })
            res.status(200).json({
                status: "success",
                message: "Task updated successfully"
            })
        } else {
            res.status(400).json({
                status: "failure",
                message: "User Not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        })
    }
})

Router.delete("/delete/:userId/:recipeId", Authorization, async (req, res) => {
    try {
        const { userId, recipeId } = req.params
        const isUser = await User.findById(userId)
        if (isUser) {
            const isTask = await isUser.recipesList.find((eachRecipe) => eachRecipe.id === recipeId)
            if (isTask) {
                const deletingRecipe = await User.updateOne({ "_id": userId },
                    { $pull: { recipesList: { "_id": recipeId } } }
                )
                res.status(200).json({
                    status: "success",
                    message: "recipe deleted"
                })
            } else
                res.status(400).json({
                    status: "failure",
                    message: "recipe Not found"
                })
        } else {
            res.status(400).json({
                status: "failure",
                message: "User Not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        })
    }
})

module.exports = Router