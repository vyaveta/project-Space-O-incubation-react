const client_router = require('express').Router()
const {clientRegister , clientAuthentication} = require('../controllers/clientControllers')

client_router.post('/register',clientRegister)

client_router.post('/login',clientAuthentication)

module.exports = client_router