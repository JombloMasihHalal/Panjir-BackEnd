const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./mongoose')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())       // to support JSON-encoded bodies
app.use(express.urlencoded())
app.use(cors())
app.use(morgan('dev'))

app.get('/', async (_, res) => {
    res.send('Hello World!')
})
app.use('/api', require('./src/api'))

app.listen(port, () => {
    console.log(`Panjir-Backend listening at http://localhost:${port}`)
})