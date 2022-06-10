const User = require('../models/User')



exports.userUpdate = async (req, res, next) => {
    try {
        const singleUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(singleUser)
    } catch (error) {
        next('Error updating userl' + error)
    }


}

exports.userDelete = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "User succesfuly deleted" })
    } catch (error) {
        next('Error deleting user' + error)
    }


}

exports.getUser = async (req, res, next) => {
    try {
        const singleUser = await User.findById(req.params.id)

        res.status(200).json(singleUser)
    } catch (error) {
        next('Error getting hotel' + error)
    }


}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        next('Error getting hotels' + error)
    }


}
