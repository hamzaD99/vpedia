const models = require('../../models')
const ContactMessage = models.ContactMessage

module.exports.createMessage = async (req, res) => {
    const { name, email, phone, subject, message } = req.body
    
    await ContactMessage.create({name: name, email: email, phone: phone, subject: subject, message: message})
    .then(async (message) => {
        return res.status(201).send(message);
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({ error: err })
    })
}