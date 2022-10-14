import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    secret: { 
        type: String
    }
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel