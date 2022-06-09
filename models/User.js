const mongoose = reqire('mongoose')

const userSchema = new moongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })





module.exports = mongoose.module("User", userSchema)