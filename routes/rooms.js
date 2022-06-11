const express = require('express')
const { createRoom, roomDelete, getRoom, getRooms, updateRoom } = require('../controllers.js/roomscontroller')

const router = express.Router()



router.post('/:hotelId', createRoom)
router.post('/:id', updateRoom)
router.delete('/:id/:hotelId', roomDelete)
router.get('/:id', getRoom)
router.get('/', getRooms)

module.exports = router