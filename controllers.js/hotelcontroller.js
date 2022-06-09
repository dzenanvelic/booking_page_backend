const Hotel = require('../models/Hotel')


exports.hotelCreate = async (req, res) => {
    try {
        const hotel = new Hotel(req.body)
        const savedHotel = await hotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json({ error: `Error creating hotel + ${error}` })
    }


}
exports.hotelUpdate = async (req, res) => {
    try {
        const singleHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(singleHotel)
    } catch (error) {
        res.status(500).json({ error: `Error updating hotel + ${error}` })
    }


}

exports.hotelDelete = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Hotel succesfuly deleted" })
    } catch (error) {
        res.status(500).json({ error: `Error deleting hotel + ${error}` })
    }


}

exports.getHotel = async (req, res) => {
    try {
        const singleHotel = await Hotel.findById(req.params.id)

        res.status(200).json(singleHotel)
    } catch (error) {
        res.status(500).json({ error: `Error getting hotel + ${error}` })
    }


}

exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find()

        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json({ error: `Error creating hotel + ${error}` })
    }


}
