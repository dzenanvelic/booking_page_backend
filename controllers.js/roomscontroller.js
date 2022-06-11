const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

exports.createRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId

        const room = new Room(req.body)
        const savedRoom = await room.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } },)
        } catch (error) {
            next(error)
        }


        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }


}
exports.updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.getByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }

}
exports.roomDelete = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {

            await Hotel.findByIdAndUpdate(req.params.hotelId, { $pull: { rooms: req.params.id } }, { new: true })
        } catch (error) {
            next(error)
        }
        res.status(200).json({ message: "Room succesfuly deleted" })
    } catch (error) {
        next('Error deleting room' + error)
    }


}

exports.getRoom = async (req, res, next) => {
    try {
        const singleRoom = await Room.findById(req.params.id)

        res.status(200).json(singleRoom)
    } catch (error) {
        next('Error getting room' + error)
    }


}

exports.getRooms = async (req, res) => {
    try {
        const allRooms = await Room.find()

        res.status(200).json(allRooms)
    } catch (error) {
        next('Error getting rooms' + error)
    }


}