import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr"
import * as jwt from "jsonwebtoken"

const cryptr = new Cryptr("s3cr3ts4lt")

async function generateSecret() {
    let secret = cryptoRandomString({ length: 10, type: 'alphanumeric' })
    console.log(cryptr.encrypt(secret));
    return cryptr.encrypt(secret)
}

function decryptSecret(hash: string) {
    console.log(cryptr.decrypt(hash));
    return cryptr.decrypt(hash)
}

function decryptAndSign(hashedSecret: string, payload:Object) {
    try {
        const secret = cryptr.decrypt(hashedSecret)
        const signedPayload = jwt.sign(payload, secret)
        return cryptr.encrypt(signedPayload)
    } catch (error) {
        console.log(error);
        return false
    }
}



export {
    generateSecret,
    decryptAndSign,
    decryptSecret
}