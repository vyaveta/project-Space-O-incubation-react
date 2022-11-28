const admin_router = require('express').Router()
const {adminRegister , adminAuthentication } = require("../controllers/adminControllers")
module.exports = admin_router

admin_router.post('/register',adminRegister)

admin_router.post('/login',adminAuthentication)