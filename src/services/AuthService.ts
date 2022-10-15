import UserModel from "../models/User"
import { hashPassword, verifyPassword, userExists, generateAuthToken } from "../utils"
import { generateSecret, tokenizeSecrets } from "../services/EncryptionService"
import { Request, Response } from "express"




function login(req: Request, res: Response){

}

async function register(req: Request, res: Response){
    const { email, password } = req.body
    //NOTE - Verify if email us already in use
    if(await userExists(email)){
        return res.status(409).send({
            "message":"This email is already in use"
        })
    }
    //NOTE - Hash user password
    const hashedPassword = await hashPassword(password)
    //NOTE - Generate random secret for user
    const secret = await generateSecret()
    const newUser = new UserModel({email, password: hashedPassword, secret})
     newUser.save((err, result)=>{
        if(err){
            return res.status(500).send({
                "message":"Something went wrong",
                "error": err.message
            })
        }
        const authToken = generateAuthToken({email})
        console.log(authToken);
        return res.status(200).send({
            "message":"User registered",
            "token":authToken
        })
    })
}


export {
    register,
    login
}