const erfunc = require('../utils/error.js')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        // return console.log("reqbody", req.body)
        //check all fields are filled up
        if (!username || !email || !password) {
            return next(erfunc.createError(403, "Please fill up all fields"))
        }
        //find if user exists
        const user = await User.findOne({ username })
        if (user) {
            return next(erfunc.createError(400, "User already exists"))
        }
        //hash password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            email,
            password: hash
        })
        //save new user
        await newUser.save()
        res.status(201).json({ message: "New user created!" })
    } catch (error) {
        next(error)
    }

}
exports.loginUser = async (req, res, next) => {
    try {
        //get req data
        const username = req.body.username
        const userPassword = req.body.password
        //if not all fields filled up
        if (!username || !userPassword) {
            return next(erfunc.createError(403, "Please fill up all fields"))
        }
        //find user
        const user = await User.findOne({ username })
        if (!user) {
            return next(erfunc.createError(400, "Wrong credentials"))
        }
        const validated = await bcrypt.compareSync(userPassword, user.password);
        if (!validated) {
            return next(erfunc.createError(403, "Wrong credentials"))
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherUserDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ ...otherUserDetails })
    } catch (error) {
        next(error)
    }

}