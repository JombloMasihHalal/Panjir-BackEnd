const express = require('express')
const  apiRoutes = express.Router()
const TweetController = require('./tweet.controller')

apiRoutes.get('/', async (_, res) => {
    res.send('berhasil')
})

apiRoutes.get('/test', TweetController.test)


module.exports = apiRoutes