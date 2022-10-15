import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    owner: String,
    collaborators: [String],
    secrets: {},
    name: Object

})

const ProjectModel = mongoose.model("Project", projectSchema)

export default ProjectModel