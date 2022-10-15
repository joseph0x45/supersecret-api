import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import UserModel from "../models/User"

interface authPayload{
    email: string
}

const salt = "s4ltp4p1"

function generateAuthToken(payload: authPayload){
    return jwt.sign(payload, salt, {
        expiresIn: "7d"
    })
}

async function hashPassword(plainText: string)  {
    const hashed = bcrypt.hash(plainText, 10)
    return hashed
}

async function verifyPassword(plainText: string, hash: string){
    
    
    return ""
}

async function userExists(userEmail: string) {
    let user = await UserModel.findOne({email: userEmail})
    return (!user? false: true)
}

export {
    hashPassword,
    verifyPassword,
    userExists,
    generateAuthToken
}