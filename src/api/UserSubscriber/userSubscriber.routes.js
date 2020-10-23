const express = require('express')
const  apiRoutes = express.Router()
const UserSubscriberController = require('./userSubscriber.controller')

apiRoutes.post('/addPhoneNumber', UserSubscriberController.addPhoneNumber)
apiRoutes.post('/sendBroadcast', UserSubscriberController.sendBroadcast)

module.exports = apiRoutes