const express = require('express')
const apiRoutes = express.Router()


apiRoutes.get('/', async (_, res) => {
    res.send('Test')
})

module.exports = apiRoutes