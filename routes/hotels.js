const express = require('express')
const { hotelCreate, hotelUpdate, hotelDelete, getHotel, getHotels } = require('../controllers.js/hotelcontroller')

const router = express.Router()


//create hotel
router.post('/', hotelCreate)
//update hotel
router.put('/:id', hotelUpdate)
//delete hotel
router.delete('/:id', hotelDelete)
//get hotel
router.get('/:id', getHotel)
//get hotels
router.get('/', getHotels)



module.exports = router