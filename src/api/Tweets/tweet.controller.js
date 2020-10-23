const Tweet = require('./tweet.model')

async function test(req, res) {
    await Tweet.create({
        content: "Banjir di Cipinang Indah meninggalkan sampah yang menjulang tinggi lebih dari satu meter. Membuat tak sedap dipandang   https://t.co/HEa5IlbXIV  #sampah #Jakarta  https://t.co/tUrFvjeWZA",
        dateTweetCreated: new Date('2020-05-06T17:29:48.175Z'),
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
        confidence: 8
    })
    await Tweet.create({
        content: "Taman meruya ilir masih tinggi banjirnya, yang lain gimana ? #BanjirJakarta  https://t.co/JEwdaZ90Nz",
        dateTweetCreated: new Date('2020-01-01T08:41:52.175Z'),
        "latitude": "-6.19653775",
        "longitude": "106.74413980318786",
        locationInfo: {
            "country": "Indonesia",
            "country_code": "id",
            "province": "Daerah Khusus Ibukota Jakarta",
            "city": "Jakarta Barat",
            "kecamatan": "Kembangan",
            "kelurahan": "Meruya Utara",
            "parsed_place_name": "Taman, RW 02, Meruya Utara, Daerah Khusus Ibukota Jakarta, Meruya Utara, Kembangan, Jakarta Barat, Indonesia",
            "type": "OSM",
            "place_id": "123470372"
        },
        img: "https://pbs.twimg.com/profile_images/874129984524238848/lfNpT7ME_400x400.jpg",
        tweet_url: "https://twitter.com/dwi_sustama79/status/1212187148675252224",
        username: "dwi_sustama79",
        name: "Dwi M S",
        confidence: 3
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
    const { query: { since, until, latitude, longitude, sortByConfidence } } = req
    const qFind = {
        dateTweetCreated: { "$gte": new Date(since), "$lte": new Date(until) }
    }
    if (latitude && longitude) {
        qFind.latitude = latitude
        qFind.longitude = longitude
    }
    let q
    if (sortByConfidence && sortByConfidence === "1") {
        q = Tweet.find(qFind).sort([['confidence', -1]])
    } else {
        q = Tweet.find(qFind).sort([['dateTweetCreated', -1]])
    }
    const result = await q
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