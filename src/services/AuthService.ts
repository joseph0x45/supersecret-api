import UserModel from "../models/User"
import { hashPassword, verifyPassword, userExists, generateAuthToken } from "../utils"
import { createUSK } from "../services/EncryptionService"
import { Request, Response } from "express"




async function login(req: Request, res: Response){
    const { email, password } = req.body
    if(!await (userExists(email))){
        return res.status(404).send({
            "message":"User not found"
        })
    }
    const userDocument = await UserModel.findOne({
        email
    })
    if(! await verifyPassword(password, userDocument?.password as string)){
        return res.status(400).send({
            "message":"Wrong password"
        })
    }
    const USK = createUSK(password)
    const authToken = generateAuthToken({email})
    return res.status(200).send({
        "authToken":authToken,
        "USK":USK,
        "user":email
    })

}

async function register(req: Request, res: Response){
    const { email, password } = req.body
    if(await userExists(email)){
        return res.status(409).send({
            "message":"This email is already in use"
        })
    }
    const hashedPassword = await hashPassword(password)
    const USK = createUSK(password)
    console.log(USK, password)
    const newUser = new UserModel({email, password: hashedPassword})
     newUser.save((err, result)=>{
        if(err){
            return res.status(500).send({
                "message":"Something went wrong",
                "error": err.message
            })
        }
        const authToken = generateAuthToken({email})
        return res.status(200).send({
            "token":authToken,
            "USK": USK,
            "user": email
        })
    })
}

async function getUsername(req: Request, res: Response) {
    const { decrypted } = req.body
    return res.status(200).send({
        "message":"Username fetched",
        "data":decrypted
    })
}

export {
    register,
    login,
    getUsername
}