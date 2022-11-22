"use strict";
const mongoose__client = require('mongoose');
const clientSchema = new mongoose__client.Schema({
    clientname: {
        type: String, required: true, min: 3, max: 26
    },
    email: {
        type: String, required: true, unique: true, min: 4, max: 30
    },
    password: {
        type: String, max: 17, min: 5
    },
    googleAccount: {
        type: mongoose__client.Schema.Types.Mixed, default: false
    }
});
module.exports = mongoose__client.model('Clients', clientSchema);
