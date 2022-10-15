import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import UserModel from "../models/User"
import { Request, Response, NextFunction } from "express"
import ProjectModel from "../models/Project"

interface authPayload{
    email: string
}

const salt = "s4ltp4p1"

function generateAuthToken(payload: authPayload){
    return jwt.sign(payload, salt, {
        expiresIn: "7d"
    })
}



function checkAuthState(req: Request, res: Response, next: NextFunction){
    const headers = req.headers.authorization
    if(!headers){
        return res.status(401).send({
            "message":"User not authenticated"
        })
    }
    const token = headers.split(" ")[1]
    try {
        const decrypted = jwt.verify(token, salt)
        req.body.decrypted = decrypted
        next()
    } catch (error) {
        return res.status(401).send({
            "message":"Invalid token"
        })
    }
    
}


async function hashPassword(plainText: string)  {
    const hashed = bcrypt.hash(plainText, 10)
    return hashed
}

async function verifyPassword(plainText: string, hash: string){
    const match = await bcrypt.compare(plainText, hash)
    return match
}

async function userExists(userEmail: string) {
    let user = await UserModel.findOne({email: userEmail})
    return (!user? false: true)

}

async function projectExists(name: string) {
    let project = await ProjectModel.findOne({name: name})
    return (!project? false: true)

}

export {
    hashPassword,
    verifyPassword,
    userExists,
    generateAuthToken,
    checkAuthState,
    projectExists
}