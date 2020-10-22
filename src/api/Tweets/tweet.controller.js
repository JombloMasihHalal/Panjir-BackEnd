const Tweet = require('./tweet.model')

async function test(req, res) {
    await Tweet.create({
        content: "Banjir di Cipinang Indah meninggalkan sampah yang menjulang tinggi lebih dari satu meter. Membuat tak sedap dipandang   https://t.co/HEa5IlbXIV  #sampah #Jakarta  https://t.co/tUrFvjeWZA",
        dateTweetCreated: new Date('2020-01-06T17:29:48.175Z'),
        "latitude": "-6.2079995",
        "longitude": "106.89084847872",
        locationInfo: {
            "country": "Indonesia",
            "country_code": "id",
            "province": "Daerah Khusus Ibukota Jakarta",
            "city": "Jakarta Timur",
            "kecamatan": "Pulo Gadung",
            "kelurahan": "Cipinang",
            "parsed_place_name": "Daerah Khusus Ibukota Jakarta, Cipinang, Pulo Gadung, Jakarta Timur, Indonesia",
            "type": "OSM",
            "place_id": "235961679"
        },
        img: "https://pbs.twimg.com/profile_images/874129984524238848/lfNpT7ME_400x400.jpg",
        tweet_url: "https://twitter.com/PasangMata/status/1214131946961289217",
        username: "PasangMata",
        name: "pasangmatadotcom",
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