import  cryptoRandomString from "crypto-random-string";
import * as bcrypt from "bcrypt"

async function generateSecret() {
    let secret = cryptoRandomString({length: 10, type: 'alphanumeric'})
    secret = await bcrypt.hash(secret, 10)
    return secret
}

async function tokenizeSecrets() {
    return "duh"
}


export {
    generateSecret,
    tokenizeSecrets
}