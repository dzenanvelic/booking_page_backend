const Hotel = require('../models/Hotel')


exports.hotelCreate = async (req, res, next) => {
    try {
        const hotel = new Hotel(req.body)
        const savedHotel = await hotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next('Error creating hotel' + error)
    }


}
exports.hotelUpdate = async (req, res, next) => {
    try {
        const singleHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(singleHotel)
    } catch (error) {
        next('Error updating hotel' + error)
    }


}

exports.hotelDelete = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Hotel succesfuly deleted" })
    } catch (error) {
        next('Error deleting hotel' + error)
    }


}

exports.getHotel = async (req, res, next) => {
    try {
        const singleHotel = await Hotel.findById(req.params.id)

        res.status(200).json(singleHotel)
    } catch (error) {
        next('Error getting hotel' + error)
    }


}

//find number hotels by city
exports.countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {

        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })

        )
        res.status(200).json(list)

    } catch (error) {
        next(error)
    }
}

//get number by type
exports.countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortsCount = await Hotel.countDocuments({ type: "resort" })
        const villasCount = await Hotel.countDocuments({ type: "villa" })
        const cabinsCount = await Hotel.countDocuments({ type: "cabin" })


        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortsCount },
            { type: "villas", count: villasCount },
            { type: "cabins", count: cabinsCount },


        ])
    } catch (error) {
        next(error)
    }
}
//get all hotels
exports.getHotels = async (req, res) => {
    const { min, max, ...others } = req.query;

    try {
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 0, $lt: max || 999 } }).limit(req.query.limit)

        res.status(200).json(hotels)
    } catch (error) {
        next('Error getting hotels' + error)
    }


}
