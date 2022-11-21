const client_router = require('express').Router()
const {clientRegister} = require('../controllers/clientControllers')

client_router.post('/register',clientRegister)

module.exports = client_router