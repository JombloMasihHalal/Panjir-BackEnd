const express = require('express')
const  apiRoutes = express.Router()
const UserSubscriberController = require('./userSubscriber.controller')

apiRoutes.post('/addPhoneNumber', UserSubscriberController.addPhoneNumber)

module.exports = apiRoutes