const mongoose = require('mongoose')

const hotelsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photos: {
        type: [String],

        required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10

    },
    ratingType: {
        type: String,
        default: "Exceptional"

    },
    rooms: {
        type: [String]
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })


module.exports = mongoose.model("Hotel", hotelsSchema)