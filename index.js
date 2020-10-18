const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const morgan = require('morgan')
require('./mongoose')

const app = express()
const port = process.env.PORT || 3000
app.use(morgan('dev'))

app.get('/', async (_, res) => {
    res.send('Hello World!')
})
app.use('/api', require('./src/api'))

app.listen(port, () => {
    console.log(`Panjir-Backend listening at http://localhost:${port}`)
})