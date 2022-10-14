import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

const salt = "ssecretsalt"

async function hashPassword(plainText: string) : Promise<string> {
    const hashed = bcrypt.hashSync(plainText, salt)
    return hashed
}

async function verifyPassword(plainText: string, hash: string): Promise<string>{
    
    
    return ""
}