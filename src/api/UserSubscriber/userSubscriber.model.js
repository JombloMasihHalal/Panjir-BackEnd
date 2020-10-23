const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSubscriberSchema = new Schema({
    phoneNumber: {
        type: String
    },
})


module.exports = mongoose.model('UserSubscriber', userSubscriberSchema)