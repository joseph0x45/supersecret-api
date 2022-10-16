import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr"
import * as jwt from "jsonwebtoken"

const cryptr = new Cryptr("s3cr3ts4lt")

async function generateSecret() {
    let secret = cryptoRandomString({ length: 10, type: 'alphanumeric' })
    console.log(cryptr.encrypt(secret));
    return cryptr.encrypt(secret)
}

function decryptSecret(secretHash: string, jwtHash: string) {
    const decrypted = [cryptr.decrypt(secretHash), cryptr.decrypt(jwtHash)]
    let secretsObject
    try {
        secretsObject = jwt.decode(decrypted[1])
        console.log(secretsObject);
    } catch (error) {
        console.log(error);
    }
    return secretsObject
}

function decryptAndSign(hashedSecret: string, payload: Object) {
    const secret = cryptr.decrypt(hashedSecret)
    const signedPayload = jwt.sign(payload, secret)
    return cryptr.encrypt(signedPayload)
}

function updateSecretsToken(newPayload: Object, userSecretHash: string) {
    try {
        console.log(arguments);
        const decryptedSecret = cryptr.decrypt(userSecretHash)
        console.log(decryptedSecret);
        const newSecretsToken = jwt.sign(newPayload, decryptedSecret)
        console.log(newSecretsToken);
        return newSecretsToken
    } catch (error) {
        console.log(error);

    }

}

export {
    generateSecret,
    decryptAndSign,
    decryptSecret,
    updateSecretsToken
}