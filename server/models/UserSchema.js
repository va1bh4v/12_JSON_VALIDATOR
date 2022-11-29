const mongoose = require('mongoose')

let Schema = mongoose.Schema
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true
        },

    }
)

const User = mongoose.model('JsonWeb_Users', UserSchema)

module.exports = User
