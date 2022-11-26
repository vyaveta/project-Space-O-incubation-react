"use strict";
const mongoose__rocket = require('mongoose');
const rocketSchema = new mongoose__rocket.Schema({
    rocketName: {
        type: String, required: true, min: 3
    },
    speed: {
        type: Number, required: true
    },
    totalBookedClients: {
        type: Array
    },
    seats: {
        type: Array
    }
});
module.exports = mongoose__rocket.model('Rocket', rocketSchema);
