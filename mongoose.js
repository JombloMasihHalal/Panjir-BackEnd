const mongoose = require('mongoose')
const uriFormat = require('mongodb-uri')

function encodeMongoURI (urlString) {
  if (urlString) {
    let parsed = uriFormat.parse(urlString)
    urlString = uriFormat.format(parsed)
  }

  return urlString
}

mongoose.Promise = global.Promise
mongoose.connect(encodeMongoURI(process.env.DATABASE_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify: false
})
