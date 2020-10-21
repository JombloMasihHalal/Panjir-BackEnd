const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweetSchema = new Schema(
    {
        content: {
            type: String,
            trim: true
        },
        tweetId: {
            type: String
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        confidence: {
            type: Number
        },
        dateTweetCreated: {
            type: Date
        },
        urgencies: [
            {
                urgencyName: String,
                score: Number
            }
        ],
        locationInfo: {
            country: {
                type: String
            },
            country_code: {
                type: String
            },
            province: {
                type: String
            },
            city: {
                type: String
            },
            kecamatan: {
                type: String
            },
            kelurahan: {
                type: String
            },
            parsed_place_name: {
                type: String
            },
            'type': {
                type: String
            },
            place_id: {
                type: String
            },
            specific_api: {
                type: Schema.Types.Mixed
            },
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tweet', tweetSchema)