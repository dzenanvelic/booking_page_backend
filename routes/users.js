


const express = require('express')
const { } = require('../controllers.js/hotelcontroller')
const { userUpdate, userDelete, getUser, getUsers } = require('../controllers.js/usercontroller')
const { verifyUser, verifyToken, verifyAdmin } = require('../utils/verifyToken')

const router = express.Router()


//check verifyToken
router.get('/checkauth', verifyToken, (req, res, next) => {
    try {
        res.send("Hello user you are authenticated")
    } catch (error) {
        next(error)
    }

})
//check verifyUser
router.get('/checkuser/:id', verifyToken, verifyUser, (req, res, next) => {
    try {
        res.send("Hello user you are allowed to delete user")
    } catch (error) {
        next(error)
    }


})
//check verifyadmin
router.get('/checkadmin', verifyToken, verifyAdmin, (req, res, next) => {
    try {
        res.send("Hello admin you are allowed to delete all")
    } catch (error) {
        next(error)
    }


})


//update user
router.put('/:id', verifyUser, userUpdate)
//delete user
router.delete('/:id', verifyUser, userDelete)
//get user
router.get('/:id', verifyUser, getUser)
//get users
router.get('/', verifyAdmin, getUsers)






module.exports = router