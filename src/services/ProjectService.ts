import ProjectModel from "../models/Project";
import UserModel from "../models/User";
import { Request, Response } from "express"
import { decryptAndSign, decryptSecret, updateSecretsToken } from "./EncryptionService"
import { projectExists } from "../utils"
import  { JwtPayload } from "jsonwebtoken"


async function createProject(req: Request, res: Response) {
    try {
        const { name, decrypted } = req.body
        if (await projectExists(name)) {
            return res.status(409).send({
                "message": "A project with the same name already exists"
            })
        }
        const userAccount = await UserModel.findOne({
            email: decrypted.email
        })
        const userSecret = userAccount!.secret
        console.log(userSecret);
        const secrets = decryptAndSign(userSecret as string, {
            secrets: []
        })
        const newProject = new ProjectModel({
            owner: decrypted.email,
            collaborators: [],
            secrets,
            name
        })
        newProject.save((err, result) => {
            if (err) {
                return res.status(500).send({
                    "message": "Something went wrong",
                    "error": err
                })
            }
            return res.status(201).send({
                "message": "Project created",
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
        const { key, value, project } = req.body
        const targettedProject = await ProjectModel.findById(project)
        const secretsToken = targettedProject!.secrets
        const owner = targettedProject!.owner
        const userAccount = await UserModel.findOne({
            email: owner
        })
        const userSecret = userAccount!.secret
        const decrypted: JwtPayload = decryptSecret(userSecret as string, secretsToken as string) as JwtPayload
        decrypted.secrets.push({ key, value })
        const newSecretsToken = updateSecretsToken(decrypted, userSecret as string)  
        ProjectModel.findByIdAndUpdate(project, {
            $set:{
                secrets: newSecretsToken
            }
        }, (err, result)=>{
            if(err){
                return res.status(500).send({
                    "message":"Something went wrong"
                })
            }
        })
        return res.status(200).send({
            "message":"New secret added",
            "data":newSecretsToken,
        })

    } catch (error) {
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


export {
    createProject,
    createSecret,
    fetchProjects
}