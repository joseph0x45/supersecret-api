import Cryptr from "cryptr"
import { SuperSecretKeys } from "../config"

const cryptr = new Cryptr(SuperSecretKeys.SSEK)

function createUSK(userPlainPassword: string) {
    const USK = `${userPlainPassword}${SuperSecretKeys.SSK}`
    return cryptr.encrypt(USK)
}

function initializeProject(encryptedUSK: string) {
    try {
        const decryptr = cryptr.decrypt(encryptedUSK)
        return (new Cryptr(decryptr).encrypt(JSON.stringify({secrets:[]})))
    } catch (error) {
        console.log(error)
        return ""
    }
}

function fetchSecret(USK: string, secretsToken: string) {
    try {
        const decryptedUSK = cryptr.decrypt(USK)
        const newCrypt = new Cryptr(decryptedUSK)
        const secretsObject = newCrypt.decrypt(secretsToken)
        return cryptr.encrypt(secretsObject)
    } catch (error) {
        throw error
    }
}



function updateSecretsToken(USK: string, secrets: string, newSecret: {key: string, value: string}) {
    const decrypted = cryptr.decrypt(USK)
    const newCrypt = new Cryptr(decrypted)
    let decryptedSecrets = newCrypt.decrypt(secrets)
    let decryptedSecretsObject = JSON.parse(decryptedSecrets) as { secrets:{key: string, value: string}[] }
    decryptedSecretsObject.secrets.push(newSecret)
    return newCrypt.encrypt(JSON.stringify(decryptedSecretsObject))

}



export {
    createUSK,
    fetchSecret,
    updateSecretsToken,
    initializeProject,
    
}