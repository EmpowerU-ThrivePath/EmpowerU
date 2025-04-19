import mongoose from 'mongoose'


let models = {}
console.log("connecting to mongodb")
await mongoose.connect('mongodb+srv://websharerUser:greenapples2@cluster0.jv2tfzr.mongodb.net/capstone?retryWrites=true&w=majority&appName=Cluster0')
console.log("successfully connected to mongodb!")

const profileSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    pronouns: String,
    email: String,
    grad_year: String,
    intended_career: String
})
models.Post = mongoose.model('Profile', profileSchema)
console.log("mongoose profile model created")

export default models