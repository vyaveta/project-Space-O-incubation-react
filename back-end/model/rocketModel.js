"use strict";
const mongoose__rocket = require('mongoose');
const rocketSchema = new mongoose__rocket.Schema({
    rocketName: {
        type: String, required: true, min: 3, default: 'NovaT'
    },
    speedInMilesPerHour: {
        type: Number, required: true, default: 60
    },
    totalBookedClients: {
        type: Array
    },
    windowL: {
        type: [Object]
    },
    windowR: {
        type: [Object]
    },
    pilots: {
        type: [Object]
    },
    backSeat: {
        type: [Object]
    }
});
module.exports = mongoose__rocket.model('Rocket', rocketSchema);
