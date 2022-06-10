const express = require('express')
const { registerUser, loginUser } = require('../controllers.js/authcontroller')

const router = express.Router()


//register user
router.post('/register', registerUser)
//login user
router.post('/login', loginUser)




module.exports = router