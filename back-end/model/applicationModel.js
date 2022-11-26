"use strict";
const mongoose__applications = require('mongoose');
const applicationSchema = new mongoose__applications.Schema({
    clientname: {
        type: String, required: true, min: 2, max: 26
    },
    clientEmail: {
        type: String, required: true
    },
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, reqiured: true
    },
    email: {
        type: String, required: true
    },
    contactNumber: {
        type: Number, required: true
    },
    country: {
        type: Object, required: true
    },
    state: {
        type: String, required: true
    },
    reason: {
        type: String, required: true
    }
});
module.exports = mongoose__applications.model('Applications', applicationSchema);
