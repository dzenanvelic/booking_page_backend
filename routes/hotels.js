const express = require('express')

const router = express.Router()
const Hotel = require('../models/Hotel')

//create hotel
router.post('/', async (req, res) => {
    try {
        const hotel = new Hotel(req.body)
        const savedHotel = await hotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json({ error: `Error creating hotel + ${error}` })
    }


})
//update hotel
router.put('/:id', async (req, res) => {
    try {
        const singleHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(singleHotel)
    } catch (error) {
        res.status(500).json({ error: `Error updating hotel + ${error}` })
    }


})
//delete hotel
router.delete('/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Hotel succesfuly deleted" })
    } catch (error) {
        res.status(500).json({ error: `Error deleting hotel + ${error}` })
    }


})
//get hotel
router.get('/:id', async (req, res) => {
    try {
        const singleHotel = await Hotel.findById(req.params.id)

        res.status(200).json(singleHotel)
    } catch (error) {
        res.status(500).json({ error: `Error getting hotel + ${error}` })
    }


})
//create hotel
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find()

        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json({ error: `Error creating hotel + ${error}` })
    }


})



module.exports = router