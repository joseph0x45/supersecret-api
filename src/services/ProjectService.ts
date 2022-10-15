import ProjectModel from "../models/Project";
import { Request, Response } from "express"



async function createProject(req: Request, res: Response) {
    try {
	const { name, decrypted } = req.body
	    const newProject = new ProjectModel({
	        owner:decrypted.email,
	        collaborators: [],
	        secrets: {
                "":""
            },
	        name
	    })
	    newProject.save((err, result)=>{
	        if(err){
	            res.status(500).send({
	                "message":"Something went wrong"
	            })
	        }
	        res.status(201).send({
	            "message":"Project created",
	            "data": result
	        })
	    })
} catch (error) {
	return res.status(500).send({
        "message":"Something went wrong",
        "error": error
    })
}
}

export {
    createProject
}