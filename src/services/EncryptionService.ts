import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr"
import * as jwt from "jsonwebtoken"

const cryptr = new Cryptr("s3cr3ts4lt")

async function generateSecret() {
    let secret = cryptoRandomString({ length: 10, type: 'alphanumeric' })
    return cryptr.encrypt(secret)
}

function decryptSecret(secretHash: string, jwtHash: string) {
    const decrypted = [cryptr.decrypt(secretHash), cryptr.decrypt(jwtHash)]
    let secretsObject
    secretsObject = jwt.decode(decrypted[1])
    return secretsObject
}

function decryptAndSign(hashedSecret: string, payload: Object) {
    const secret = cryptr.decrypt(hashedSecret)
    const signedPayload = jwt.sign(payload, secret)
    return cryptr.encrypt(signedPayload)
}

function updateSecretsToken(newPayload: Object, userSecretHash: string) {
    const decryptedSecret = cryptr.decrypt(userSecretHash)
    const newSecretsToken = jwt.sign(newPayload, decryptedSecret)
    return cryptr.encrypt(newSecretsToken)
}

function decryptAndFetch( jwtHash: string ){
    const decryptedHash = cryptr.decrypt(jwtHash)
    const secretsObject = jwt.decode(decryptedHash)
    return secretsObject
}

export {
    generateSecret,
    decryptAndSign,
    decryptSecret,
    updateSecretsToken,
    decryptAndFetch
}