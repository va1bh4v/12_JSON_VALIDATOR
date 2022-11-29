const mongoose = require('mongoose')

let Schema = mongoose.Schema

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        stage: {
            type: String,
            required: true
        },
        json_obj: {
            type: String,
            required: true
        }

    }
)

const Project = mongoose.model('Project_Details', ProjectSchema)

module.exports = Project
