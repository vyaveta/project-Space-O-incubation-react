const admin__mongoose = require('mongoose')

const adminSchema : Object = new admin__mongoose.Schema({
    adminName: {
        type: String, required: true 
    },
    adminAuthCode: {
        type: String , required: true
    },
    adminAccessCode: {
        type: String, required: true
    },
    incorrectAuthCount: {
        type: Number , default: 0
    }
})

module.exports = admin__mongoose.model("Admin",adminSchema)