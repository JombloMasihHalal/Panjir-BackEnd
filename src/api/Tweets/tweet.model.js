const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweetSchema = new Schema(
    {
        content: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tweet', tweetSchema)