import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    owner: String
})

const projectModel = mongoose.model("Project", projectSchema)

export default projectModel