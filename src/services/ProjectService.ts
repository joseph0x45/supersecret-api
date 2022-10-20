import ProjectModel from "../models/Project";
import { Request, Response } from "express"
import { initializeProject, fetchSecret, updateSecretsToken } from "./EncryptionService"
import { projectExists } from "../utils"
import mongoose from "mongoose";


async function createProject(req: Request, res: Response) {
    try {
        const { name, decrypted, USK } = req.body
        if (await projectExists(name, decrypted.email)) {
            return res.status(409).send({
                "message": "A project with the same name already exists"
            })
        }
        const newProject = new ProjectModel({
            owner: decrypted.email,
            name: name,
            collaborators: [],
            secrets: initializeProject(USK)
        })
        newProject.save((err, result)=>{
            if(err){
                return res.status(500).send({
                    "message":"Something went wrong",
                    "data": err.message
                })
            }
            return res.status(200).send({
                "data": result
            })
        })
        
    } catch (error) {
        return res.status(500).send({
            "message": "Something went wrong",
            "error": error
        })
    }
}

async function createSecret(req: Request, res: Response) {
    try {
        const { key, value, project, USK } = req.body
        const targettedProject = await ProjectModel.findById(project)
        const secretsToken = targettedProject!.secrets
        const updatedSecretsToken = updateSecretsToken(USK, secretsToken as string, {key, value})
        targettedProject?.updateOne({
            "$set":{
                secrets:updatedSecretsToken
            }
        }, {}, (err, result)=>{
            if(err){
                return res.status(500).send({
                    "message":`Something went wrong ${err.message} `
                })
            }
        })
        return res.status(200).send({
            "message":"New secret added",
            "data":updatedSecretsToken,
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).send({
            "message": "Something went wrong",
            "error": error
        })
    }

}

async function fetchProjects(req: Request, res: Response) {
    try {
        const { decrypted } = req.body
        const userProjects = await ProjectModel.find({
            owner: decrypted.email
        })
        return res.status(200).send({
            "message":"Projects fetched",
            "data": userProjects
        })
    } catch (error) {
        return res.status(500).send({
            "message": "Something went wrong"
        })
    }
}

async function fetchSecrets(req: Request, res: Response){
    const { project, USK } = req.body
    if(!mongoose.isObjectIdOrHexString(project)){
        return res.status(400).send({
            "message":"Invalid projectID"
        })
    }
    const targettedProject = await ProjectModel.findById(project)
    const secretsToken = targettedProject!.secrets as string
    const decryptedSecretsToken = fetchSecret(USK, secretsToken)
    if(decryptedSecretsToken==false){
        return res.status(403).send({
            "message":"Invalid key"
        })
    }
    return res.status(200).send({
        "message":"Secrets fetched",
        "data": decryptedSecretsToken
    })
}


export {
    createProject,
    createSecret,
    fetchProjects,
    fetchSecrets
}