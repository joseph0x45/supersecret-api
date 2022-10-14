import * as bcrypt from "bcrypt"
import UserModel from "../models/User"

interface loginPayload {
    email: string
    password: string
}

interface registerPayload extends loginPayload {
    secret: string
}

function login(payload: loginPayload){

}

function register(payload: registerPayload){
    const { email, password, secret } = payload
    const newUser = new UserModel({email, })
}
