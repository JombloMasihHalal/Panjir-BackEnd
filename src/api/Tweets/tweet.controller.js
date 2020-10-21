const Tweet = require('./tweet.model')

async function test(req, res) {
    await Tweet.create({
        content: "wildan",
        dateTweetCreated: Date('2020-10-21T13:36:12.175Z'),
        "latitude": "-6.1753936",
        "longitude": "106.82718601871409",
        locationInfo: {
            "country": "Indonesia",
            "country_code": "id",
            "province": "Daerah Khusus Ibukota Jakarta",
            "city": "Jakarta Pusat",
            "kecamatan": "Gambir",
            "kelurahan": "Gambir",
            "parsed_place_name": "Monumen Nasional, Jalan Medan Merdeka Utara, RW 02, Gambir, Daerah Khusus Ibukota Jakarta, Gambir, Jakarta Pusat, 10110, Indonesia",
            "type": "OSM",
            "place_id": "172826097"
        },
        confidence: 3
    })
    await Tweet.create({
        content: "wildan",
        dateTweetCreated: Date('2020-10-21T13:36:12.175Z'),
        "latitude": "-6.1753936",
        "longitude": "106.82718601871409",
        locationInfo: {
            "country": "Indonesia",
            "country_code": "id",
            "province": "Daerah Khusus Ibukota Jakarta",
            "city": "Jakarta Pusat",
            "kecamatan": "Gambir",
            "kelurahan": "Gambir",
            "parsed_place_name": "Monumen Nasional, Jalan Medan Merdeka Utara, RW 02, Gambir, Daerah Khusus Ibukota Jakarta, Gambir, Jakarta Pusat, 10110, Indonesia",
            "type": "OSM",
            "place_id": "172826097"
        },
        confidence: 5
    })
    res.send('berhasil2')
}
// Data and time use iso string 2020-10-20T10:58:53.000Z
async function getTweetsLocation(req, res) {
    const { query: { since, until } } = req
    const result = await Tweet.aggregate([
        {
            $match: {
                dateTweetCreated: { "$gte": new Date(since), "$lte": new Date(until) }
            }
        },
        {
            $group: {
                "_id": {
                    "longitude": "$longitude",
                    "latitude": "$latitude"
                },
                "tweetNum": { "$sum": 1 },
                "confidence": { "$sum": "$confidence" },
                "title": { $first: "$locationInfo.kecamatan" }
            }
        },
        {
            $project: {
                longitude: "$_id.longitude",
                latitude: "$_id.latitude",
                "tweetNum": "$tweetNum",
                "title": "$title",
                "confidence": "$confidence",
                "_id": 0
            }
        }
    ])
    res.send({
        data: result
    })
}

async function listTweets(req, res) {
    const { query: { since, until, latitude, longitude } } = req
    const result = await Tweet.find({
        dateTweetCreated: { "$gte": new Date(since), "$lte": new Date(until) },
        latitude,
        longitude
    })
    res.send({
        data: result
    })
}
const TweetController = {
    test,
    getTweetsLocation,
    listTweets
}

module.exports = TweetController