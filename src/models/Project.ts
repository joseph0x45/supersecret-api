import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    owner: String,
    collaborators: [],
    secrets: [],
    name: String

})

const ProjectModel = mongoose.model("Project", projectSchema)

export default ProjectModel