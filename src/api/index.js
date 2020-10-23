const express = require('express')
const apiRoutes = express.Router()


const listRoutes = [
    { route: '/tweets', includeFile: require('./Tweets/tweet.routes') },
    { route: '/test', includeFile: require('./test/test') },
    { route: '/usersSubscriber', includeFile: require('./UserSubscriber/userSubscriber.routes') }
]

listRoutes.forEach((e) => {
    apiRoutes.use(e.route, e.includeFile)
})

module.exports = apiRoutes