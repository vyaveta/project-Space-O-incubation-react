"use strict";
const client_router = require('express').Router();
const { clientRegister, clientAuthentication, clientSeatBooking } = require('../controllers/clientControllers');
const { clientAuthenticationMiddlewareFunction } = require('../middlewares/AuthMiddleware');
client_router.post('/', clientAuthenticationMiddlewareFunction);
client_router.post('/register', clientRegister);
client_router.post('/login', clientAuthentication);
client_router.post('/booking', clientSeatBooking);
module.exports = client_router;
