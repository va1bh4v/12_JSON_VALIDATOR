const mongoose = require('mongoose')

let Schema = mongoose.Schema

const ValidatorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        }
    }
)

const Validator = mongoose.model('JsonWeb_Validators', ValidatorSchema)

module.exports = Validator

