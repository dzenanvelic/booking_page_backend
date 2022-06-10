const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
//paths to routes
const authRoute = require('./routes/auth')
const hotelsRoute = require('./routes/hotels')
const roomsRoute = require('./routes/rooms')
const usersRoute = require('./routes/users')

//midllevares
dotenv.config()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())



//connect to database
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,

})
    .then(console.log("Database is running"))
    .catch(err => console.log("MONGO database connection error " + err))

//routes
app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

//errors handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})










app.listen(process.env.PORT || 8000, () => {
    console.log(`server runs on port ${process.env.PORT}`)
}) 