const mongoose = require("mongoose")

const URI = process.env.URI
const connectToDB = () => {
    mongoose.connect(`${URI}`)
        .then(() => console.log("mongoDB connected Successfully"))
        .catch((error) => console.log(`lol${error.message}`))

    mongoose.connection.on("connected", () => {
        console.log("mogoDB is connected to db")
    })
    mongoose.connection.on("error", (err) => {
        console.log(`Error message: ${err}`)
    })
    mongoose.connection.on("disconnected", () => {
        console.log("mongoDB is disconnected")
    })
    process.on("SIGINT", async () => {
        await mongoose.connection.close()
        process.exit(0)
    })

}
module.exports = connectToDB