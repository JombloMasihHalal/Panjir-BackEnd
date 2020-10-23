const UserSubscriber = require('./userSubscriber.model')
const axios = require('axios').default
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

async function sendBroadcast(req, res) {
    const { body: { messageText } } = req 
    const userSubscribers = await UserSubscriber.find()
    const userSubscribersPhoneNumber = userSubscribers.map(e => e.phoneNumber)
    const linkRequest = "https://api.thebigbox.id/sms-broadcast/1.0.0/send"
    const bodyBigbox = {
        "smsblast_username": "bigbox_username",
        "smsblast_password": "bigbox_password",
        "smsblast_senderid": "bigbox_senderid",
        "msisdns": userSubscribersPhoneNumber,
        "text": messageText
    }
    res.send(await axios.post(linkRequest,bodyBigbox))
}


const UserSubscriberController = {
    addPhoneNumber,
    sendBroadcast
}

module.exports = UserSubscriberController