const express = require('express')
const { hotelCreate, hotelUpdate, hotelDelete, getHotel, getHotels } = require('../controllers.js/hotelcontroller')
const { verifyToken, verifyAdmin } = require('../utils/verifyToken')

const router = express.Router()


//create hotel
router.post('/', verifyToken, verifyAdmin, hotelCreate)
//update hotel
router.put('/:id', verifyToken, verifyAdmin, hotelUpdate)
//delete hotel
router.delete('/:id', verifyToken, verifyAdmin, hotelDelete)
//get hotel
router.get('/:id', getHotel)
//get hotels
router.get('/', getHotels)



module.exports = router