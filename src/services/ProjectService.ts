import ProjectModel from "../models/Project";
import UserModel from "../models/User";
import { Request, Response } from "express"
import { decryptAndSign } from "./EncryptionService"
import { projectExists } from "../utils"


async function createProject(req: Request, res: Response) {
    try {
        const { name, decrypted } = req.body
        if(await projectExists(name)){
            return res.status(409).send({
                "message":"A project with the same name already exists"
            })
        }
        const userAccount = await UserModel.findOne({
            email: decrypted.email
        })
        const userSecret = userAccount!.secret
        console.log(userSecret);
        const secrets = decryptAndSign(userSecret as string, {
            secrets:[]
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
        //NOTE - Find targetted project with project id
        const targettedProject = await ProjectModel.findById(project)
        //NOTE - Get secrets jwt token, can be "" if user doesn't have any secrets yet
        const secretsToken = targettedProject!.secrets
        console.log(secretsToken);
        //NOTE - Get project owner's encrytion key
        const owner = targettedProject!.owner
        const userAccount = await UserModel.findOne({
            email: owner
        })
        const userSecret = userAccount!.secret
        console.log(userSecret);
        if (secretsToken==""){
            console.log("User's first secret");
            const newSecret = {
                key,
                value
            }

        }
        

    } catch (error) {
        return res.status(500).send({
            "message":"Something went wrong",
            "error":error
        })
    }

}

export {
    createProject
}