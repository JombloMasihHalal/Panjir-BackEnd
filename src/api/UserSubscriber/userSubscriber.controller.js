const UserSubscriber = require('./userSubscriber.model')

async function addPhoneNumber(req, res) {
    const { body: {phoneNumber} } = req 
    if (phoneNumber) {        
        res.send(await UserSubscriber.create({
            phoneNumber
        }))
    } else {
        res.status(400)
    }
}


const UserSubscriberController = {
    addPhoneNumber
}

module.exports = UserSubscriberController