const Hotel = require('../models/Hotel')


exports.hotelCreate = async (req, res, next) => {
    try {
        const hotel = new Hotel(req.body)
        const savedHotel = await hotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next('Error creating hotel' + error)
    }


}
exports.hotelUpdate = async (req, res, next) => {
    try {
        const singleHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(singleHotel)
    } catch (error) {
        next('Error updating hotel' + error)
    }


}

exports.hotelDelete = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Hotel succesfuly deleted" })
    } catch (error) {
        next('Error deleting hotel' + error)
    }


}

exports.getHotel = async (req, res, next) => {
    try {
        const singleHotel = await Hotel.findById(req.params.id)

        res.status(200).json(singleHotel)
    } catch (error) {
        next('Error getting hotel' + error)
    }


}

exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find()

        res.status(200).json(hotels)
    } catch (error) {
        next('Error getting hotels' + error)
    }


}
