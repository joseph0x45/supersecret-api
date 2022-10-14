import * as bcrypt from "bcrypt"
import UserModel from "../models/User"
import { hashPassword, verifyPassword } from "../utils"

interface loginPayload {
    email: string
    password: string
}

interface registerPayload extends loginPayload {
    secret: string
}

function login(payload: loginPayload){

}

async function register(payload: registerPayload){
    const { email, password, secret } = payload
    let _hashedPassword = await hashPassword(password)
    const newUser = new UserModel({email, password: hashPassword, secret})
    newUser.save((err, result)=>{
        if(err){
            return [false, err.message]
        }
        return [true, result]
    })
}
